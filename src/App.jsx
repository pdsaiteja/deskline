import { useState } from 'react';
import Brand from './components/Brand.jsx';
import FaqIngestion from './components/FaqIngestion.jsx';
import FaqList from './components/FaqList.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { bestMatch, THRESHOLD } from './utils/ragMatcher.js';

const DEFAULT_FAQS = [
  {
    q: 'How do I reset my password?',
    a: "Go to the login screen and click 'Forgot password'. Enter your account email and we'll send a reset link valid for 60 minutes.",
  },
  {
    q: 'How do I export my data?',
    a: 'Go to Settings > Data > Export to download a CSV of your boards, cards, and custom fields.',
  },
  {
    q: 'How do I invite a team member?',
    a: 'Workspace admins can invite members from Settings > Members > Invite. Invites expire after 14 days if not accepted.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'Go to Settings > Billing > Cancel plan. Your workspace stays active until the end of the current billing period.',
  },
];

const DEFAULT_STATS = {
  total: 0,
  deflected: 0,
  handoff: 0,
  ratingsUp: 0,
  ratingsDown: 0,
};

function createId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const [faqs, setFaqs] = useLocalStorage('deskline-faqs', DEFAULT_FAQS);
  const [stats, setStats] = useLocalStorage('deskline-stats', DEFAULT_STATS);
  const [fallbacks, setFallbacks] = useLocalStorage('deskline-fallbacks', []);
  const [messages, setMessages] = useState([]);
  const [adminOn, setAdminOn] = useState(false);

  function handleAddFaq(faq) {
    setFaqs((current) => [...current, faq]);
  }

  function handleSend(query) {
    setMessages((current) => [
      ...current,
      { id: createId(), type: 'user', text: query },
    ]);

    setStats((current) => ({ ...current, total: current.total + 1 }));

    const { faq, score } = bestMatch(query, faqs);

    if (!faq || score < THRESHOLD) {
      setFallbacks((current) => [...current, query]);
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          type: 'fallback',
          query,
          handoffComplete: false,
        },
      ]);
      return;
    }

    setStats((current) => ({ ...current, deflected: current.deflected + 1 }));
    setMessages((current) => [
      ...current,
      {
        id: createId(),
        type: 'match',
        answer: faq.a,
        citation: faq.q,
        score,
        rating: null,
      },
    ]);
  }

  function handleRate(messageId, vote) {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId ? { ...message, rating: vote } : message
      )
    );

    setStats((current) => ({
      ...current,
      ratingsUp: vote === 'up' ? current.ratingsUp + 1 : current.ratingsUp,
      ratingsDown: vote === 'down' ? current.ratingsDown + 1 : current.ratingsDown,
    }));
  }

  function handleHandoff(messageId) {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId
          ? { ...message, handoffComplete: true }
          : message
      )
    );

    setStats((current) => ({ ...current, handoff: current.handoff + 1 }));
  }

  return (
    <div className="app">
      <div className="col left">
        <Brand />
        <FaqIngestion faqs={faqs} onAddFaq={handleAddFaq} />
        <FaqList faqs={faqs} />
      </div>

      <ChatPanel
        messages={messages}
        onSend={handleSend}
        onRate={handleRate}
        onHandoff={handleHandoff}
      />

      <AdminPanel
        stats={stats}
        fallbacks={fallbacks}
        adminOn={adminOn}
        onToggleAdmin={() => setAdminOn((current) => !current)}
      />
    </div>
  );
}

import { useState } from 'react';
import ChatThread from './ChatThread.jsx';

export default function ChatPanel({ messages, onSend, onRate, onHandoff }) {
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    onSend(trimmedQuery);
    setQuery('');
  }

  return (
    <div className="col chat-col">
      <div className="chat-head">
        <div className="chat-head-title">Ask a question</div>
        <div className="chat-head-sub">matched against the FAQ list on the left</div>
      </div>

      <ChatThread messages={messages} onRate={onRate} onHandoff={onHandoff} />

      <form className="composer" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a customer question…"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

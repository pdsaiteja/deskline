import { useState } from 'react';

export default function FaqIngestion({ faqs, onAddFaq }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion || !trimmedAnswer) {
      setError('Both question and answer are required.');
      return;
    }

    onAddFaq({ q: trimmedQuestion, a: trimmedAnswer });
    setQuestion('');
    setAnswer('');
    setError('');
  }

  return (
    <div>
      <div className="panel-label">Document ingestion · {faqs.length} FAQs</div>
      <form className="faq-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit">Add FAQ</button>
      </form>
    </div>
  );
}

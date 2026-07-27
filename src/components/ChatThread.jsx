function BotMatchMessage({ message, onRate }) {
  const { id, answer, citation, score, rating } = message;

  return (
    <div className="msg bot">
      <div className="bubble">{answer}</div>
      <div className="meta-row">
        <span className="citation">FAQ: {citation}</span>
        <span className="confidence">score {score.toFixed(2)}</span>
        <span className="rate-btns">
          <button
            type="button"
            className={rating === 'up' ? 'active' : ''}
            onClick={() => onRate(id, 'up')}
          >
            👍
          </button>
          <button
            type="button"
            className={rating === 'down' ? 'active down' : ''}
            onClick={() => onRate(id, 'down')}
          >
            👎
          </button>
        </span>
      </div>
    </div>
  );
}

function BotFallbackMessage({ message, onHandoff }) {
  return (
    <div className="msg bot">
      <div className="bubble fallback">
        I don&apos;t know this yet — please contact support.
      </div>
      <button
        type="button"
        className="handoff-btn"
        disabled={message.handoffComplete}
        onClick={() => onHandoff(message.id)}
      >
        {message.handoffComplete ? 'Escalated ✓' : 'Hand off to human agent'}
      </button>
    </div>
  );
}

export default function ChatThread({ messages, onRate, onHandoff }) {
  return (
    <div className="thread">
      {!messages.length ? (
        <div className="empty-state">
          Add a few FAQs on the left, then ask a question here the way a customer would.
        </div>
      ) : null}

      {messages.map((message) => {
        if (message.type === 'user') {
          return (
            <div className="msg user" key={message.id}>
              <div className="bubble">{message.text}</div>
            </div>
          );
        }

        if (message.type === 'match') {
          return (
            <BotMatchMessage
              key={message.id}
              message={message}
              onRate={onRate}
            />
          );
        }

        return (
          <BotFallbackMessage
            key={message.id}
            message={message}
            onHandoff={onHandoff}
          />
        );
      })}
    </div>
  );
}

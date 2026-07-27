export default function FaqList({ faqs }) {
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <div className="faq-card" key={`${faq.q}-${index}`}>
          <p className="q">{faq.q}</p>
          <p className="a">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}

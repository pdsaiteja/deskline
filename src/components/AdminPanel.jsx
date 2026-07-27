export default function AdminPanel({ stats, fallbacks, adminOn, onToggleAdmin }) {
  const totalRatings = stats.ratingsUp + stats.ratingsDown;
  const csat = totalRatings
    ? `${Math.round((stats.ratingsUp / totalRatings) * 100)}%`
    : '—';

  return (
    <div className="col right">
      <div className="login-toggle">
        <span>Admin login (simulated)</span>
        <button
          type="button"
          className={`switch ${adminOn ? 'on' : ''}`}
          aria-pressed={adminOn}
          aria-label="Toggle admin login"
          onClick={onToggleAdmin}
        />
      </div>

      {!adminOn ? (
        <div className="locked">Toggle admin login to view dashboard metrics.</div>
      ) : (
        <div className="admin-panel">
          <div className="stat-grid">
            <div className="stat">
              <div className="num">{stats.total}</div>
              <div className="lbl">questions asked</div>
            </div>
            <div className="stat">
              <div className="num">{stats.deflected}</div>
              <div className="lbl">deflected</div>
            </div>
            <div className="stat">
              <div className="num">{stats.handoff}</div>
              <div className="lbl">handed to human</div>
            </div>
            <div className="stat">
              <div className="num">{csat}</div>
              <div className="lbl">CSAT</div>
            </div>
          </div>

          <div>
            <div className="panel-label">Fallback log</div>
            <div className="fallback-log">
              {fallbacks.length ? (
                fallbacks.map((query, index) => (
                  <div className="row" key={`${query}-${index}`}>
                    {query}
                  </div>
                ))
              ) : (
                <div className="row">No fallbacks yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// @/app/user/inbox/page.tsx
import env from '@/lib/env/globals';

export default async function Home() {
  const { siteName, siteDescription } = env; 

  return (
    <div className="row" style={{ height: "calc(100vh - 76px)", margin: 0, padding: 0 }}>
      <div className="col-12 col-md-12 d-flex flex-column justify-content-center" style={{ height: "100%" }}>
        <div className="col-12 col-md-12 d-flex flex-column justify-content-center" style={{color: "var(--bs-primary)", textAlign: "center"}}>
          <h1>{siteName}</h1>
          <p>{siteDescription}</p>
        </div>
      </div>
    </div>
  );
}

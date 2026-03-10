export default function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Disclaimer</h1>
      
      <div className="prose prose-slate max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
          <p className="text-amber-900 font-medium m-0">
            <strong>Affiliate Disclosure:</strong> This website contains affiliate links. If you click on a link and make a purchase, we may receive a small commission at no extra cost to you. We only recommend tools we trust and use.
          </p>
        </div>

        <h2>General Information</h2>
        <p>
          The information provided by elements-page.com on this website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
        </p>

        <h2>Professional Disclaimer</h2>
        <p>
          The site cannot and does not contain professional web design or development advice. The web design and development information is provided for general informational and educational purposes only and is not a substitute for professional advice.
        </p>
        <p>
          Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional web design or development advice. The use or reliance of any information contained on this site is solely at your own risk.
        </p>
      </div>
    </div>
  );
}

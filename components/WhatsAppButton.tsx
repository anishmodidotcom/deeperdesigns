"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919968716498?text=Hey%2C%20I%27m%20interested%20in%20working%20with%20Deeper%20Designs"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-cursor="pointer"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 9999,
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        transition:
          "transform var(--t-base) var(--ease-spring), box-shadow var(--t-base) var(--ease-spring)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow =
          "0 16px 36px rgba(37, 211, 102, 0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="#ffffff"
        aria-hidden
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.4-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.553-.7 2.768-1.51.1-.387.1-.74.057-.832-.058-.144-.214-.215-.487-.358-.488-.244-1.806-.78-2.106-.78z"/>
        <path d="M16.014 0C7.207 0 .024 7.182.024 16c0 2.85.756 5.62 2.20 8.067L0 32l8.108-2.115a15.99 15.99 0 0 0 7.906 2.063h.007c8.81 0 15.99-7.18 15.99-16C32.01 7.18 24.825 0 16.013 0zm0 29.252h-.005a13.243 13.243 0 0 1-6.756-1.852l-.485-.288-5.024 1.31 1.34-4.91-.318-.5A13.27 13.27 0 0 1 2.755 16C2.755 8.69 8.7 2.745 16.018 2.745c3.55 0 6.882 1.382 9.39 3.892a13.184 13.184 0 0 1 3.886 9.387c-.005 7.31-5.948 13.228-13.28 13.228z"/>
      </svg>
    </a>
  );
}

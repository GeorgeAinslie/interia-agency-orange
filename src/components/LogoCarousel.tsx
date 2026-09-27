import { websiteClients } from "@/lib/clients";

function logoClass(name: string) {
  if (name === "Georgia") return "logo-carousel__item--compact";
  if (name === "Sprayaway") return "logo-carousel__item--sprayaway";
  if (name === "Bespoke Building Group") return "logo-carousel__item--large";
  return undefined;
}

function LogoSet({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="logo-carousel__set" aria-hidden={hidden || undefined}>
      {websiteClients.map((client) => (
        <li key={`${hidden ? "dup" : "live"}-${client.name}`} className={logoClass(client.name)}>
          <img src={`${client.logo}?v=2`} alt={hidden ? "" : client.name} />
        </li>
      ))}
    </ul>
  );
}

export function LogoCarousel() {
  return (
    <div className="logo-carousel" aria-label="Companies we have worked with">
      <div className="logo-carousel__track">
        <LogoSet />
        <LogoSet hidden />
      </div>
    </div>
  );
}

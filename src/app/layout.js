import { Nunito, Quicksand } from "next/font/google";
import "@/styles/globals.scss";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Salvi — Salvá comida",
  description: "Conecta personas y comercios para rescatar comida y aprovechar mejores ofertas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${nunito.variable} ${quicksand.variable}`}>
      <body>{children}</body>
    </html>
  );
}

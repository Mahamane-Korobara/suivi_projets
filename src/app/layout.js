import Layout from '@/components/layout/Layout';
import "./globals.css";

export const metadata = {
  title: "Productivity Pro",
  description: "Boostez votre productivité avec Productivity Pro - Gestion de projets simplifiée et efficace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
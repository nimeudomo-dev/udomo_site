"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Navbar, { type NavFilterPreset } from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Mortgage from "@/components/Mortgage";
import Reviews from "@/components/Reviews";
import CtaForm from "@/components/CtaForm";
import Footer from "@/components/Footer";
import CallModal from "@/components/CallModal";
import About from "@/components/About";
import Contacts from "@/components/Contacts";
import ComingSoon from "@/components/ComingSoon";
import PropertyListPage from "@/components/PropertyListPage";
import FavoritesPage from "@/components/FavoritesPage";
import SellPage from "@/components/SellPage";
import { useFavorites } from "@/hooks/useFavorites";
import EscrowPage from "@/components/EscrowPage";
import CareersPage from "@/components/CareersPage";
import BlogPage from "@/components/BlogPage";
import MortgagePage from "@/components/MortgagePage";
import OnlinePage from "@/components/OnlinePage";

type Page = "home" | "buy" | "projects" | "rent" | "sell" | "escrow" | "mortgage" | "about" | "contacts" | "favorites" | "blog" | "careers" | "tourism" | "online";

const VALID_PAGES: Page[] = ["home", "buy", "projects", "rent", "sell", "escrow", "mortgage", "about", "contacts", "favorites", "blog", "careers", "tourism", "online"];

function pageFromUrl(): Page {
  if (typeof window === "undefined") return "home";
  const p = new URLSearchParams(window.location.search).get("p");
  return (p && VALID_PAGES.includes(p as Page)) ? p as Page : "home";
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [modalOpen, setModalOpen] = useState(false);
  const [contactsReqOpen, setContactsReqOpen] = useState(false);
  const [mortgageModalOpen, setMortgageModalOpen] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { favIds, toggleFav, clearAll } = useFavorites();
  const [buyPreset, setBuyPreset] = useState<{ filter: NavFilterPreset; seq: number }>({ filter: {}, seq: 0 });

  useEffect(() => {
    setCurrentPage(pageFromUrl());
    const handlePop = () => setCurrentPage(pageFromUrl());
    window.addEventListener("popstate", handlePop);
    // Если открыли страницу с ?cta=1 — скроллим к форме
    if (new URLSearchParams(window.location.search).get("cta") === "1") {
      setTimeout(() => {
        const el = document.getElementById("ctaSection");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          const input = document.querySelector(".cta-fi") as HTMLInputElement;
          if (input) input.focus();
        }, 600);
      }, 200);
    }
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const navigateTo = useCallback((page: string, filterPreset?: NavFilterPreset) => {
    if (page === 'contacts#req') {
      setCurrentPage('contacts');
      setContactsReqOpen(true);
      window.history.pushState({}, "", "/?p=contacts");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCurrentPage(page as Page);
    if (filterPreset) setBuyPreset(prev => ({ filter: filterPreset, seq: prev.seq + 1 }));
    const url = page === "home" ? "/" : `/?p=${page}`;
    window.history.pushState({}, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToCta = useCallback(() => {
    setCurrentPage("home");
    window.history.pushState({}, "", "/");
    setTimeout(() => {
      const el = document.getElementById("ctaSection");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        const input = document.querySelector(".cta-fi") as HTMLInputElement;
        if (input) input.focus();
      }, 600);
    }, 50);
  }, []);

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        favCount={favIds.length}
        onOpenModal={() => setModalOpen(true)}
      />

      {/* HOME */}
      <div style={{ display: currentPage === "home" ? "block" : "none" }}>
        <Hero onScrollToCta={scrollToCta} />
        <Projects />
        <Mortgage onScrollToCta={() => setMortgageModalOpen(true)} />
        <Reviews />
        <CtaForm ref={ctaRef} />
      </div>

      {/* ABOUT */}
      <div style={{ display: currentPage === "about" ? "block" : "none" }}>
        <About onOpenModal={() => setModalOpen(true)} />
      </div>

      {/* CONTACTS */}
      <div style={{ display: currentPage === "contacts" ? "block" : "none" }}>
        <Contacts
          onOpenModal={() => setModalOpen(true)}
          autoOpenReq={contactsReqOpen}
          onReqOpened={() => setContactsReqOpen(false)}
        />
      </div>

      {/* ONLINE */}
      <div style={{ display: currentPage === "online" ? "block" : "none" }}>
        <OnlinePage />
      </div>

      {/* FAVORITES */}
      <div style={{ display: currentPage === "favorites" ? "block" : "none" }}>
        <FavoritesPage
          favIds={favIds}
          onToggleFav={toggleFav}
          onClearAll={clearAll}
          onNavigate={navigateTo}
        />
      </div>

      {/* BLOG */}
      <div style={{ display: currentPage === "blog" ? "block" : "none" }}>
        <BlogPage />
      </div>

      {/* CAREERS */}
      <div style={{ display: currentPage === "careers" ? "block" : "none" }}>
        <CareersPage />
      </div>

      {/* LEAD PAGES */}
      <div style={{ display: currentPage === "sell" ? "block" : "none" }}>
        <SellPage />
      </div>
      <div style={{ display: currentPage === "escrow" ? "block" : "none" }}>
        <EscrowPage />
      </div>
      <div style={{ display: currentPage === "mortgage" ? "block" : "none" }}>
        <MortgagePage />
      </div>

      {/* BUY — listing page */}
      <div style={{ display: currentPage === "buy" ? "block" : "none" }}>
        <PropertyListPage favIds={favIds} onToggleFav={toggleFav} filterPreset={buyPreset} />
      </div>

      {/* COMING SOON PAGES */}
      {([
        { page: "projects", title: "Проекты" },
        { page: "rent",     title: "Аренда" },
        { page: "tourism",  title: "Туризм" },
      ] as { page: Page; title: string }[]).map(({ page, title }) => (
        <div key={page} style={{ display: currentPage === page ? "block" : "none" }}>
          <ComingSoon title={title} onBack={() => navigateTo("home")} />
        </div>
      ))}

      <div className="ft-bridge" />
      <Footer onNavigate={navigateTo} />

      <CallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <CallModal
        isOpen={mortgageModalOpen}
        onClose={() => setMortgageModalOpen(false)}
        title="Подобрать ипотеку"
        subtitle="Оставьте номер — наш специалист свяжется и подберёт выгодные условия"
      />
    </>
  );
}

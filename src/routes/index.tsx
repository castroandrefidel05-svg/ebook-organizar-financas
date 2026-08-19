import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Check,
  ClipboardList,
  Coins,
  CreditCard,
  Eye,
  Flag,
  Instagram,
  Mail,
  MessageCircle,
  PiggyBank,
  Repeat,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTAButton } from "@/components/CTAButton";
import { CountUp, Reveal, useInView } from "@/components/Reveal";
import ebookCover from "@/assets/ebook-mockup.png";
import { CHECKOUT_URL } from "@/lib/meta-pixel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "7 Dias Para Organizar as Suas Finanças | E-book Educação Financeira" },
      {
        name: "description",
        content:
          "Método simples de 7 dias para pôr as suas finanças em ordem. E-book digital por 3.599 Kz, acesso imediato e vitalício, garantia de 7 dias.",
      },
      {
        property: "og:title",
        content: "7 Dias Para Organizar as Suas Finanças | E-book Educação Financeira",
      },
      {
        property: "og:description",
        content:
          "Diagnóstico, orçamento, dívidas, reserva e metas em apenas 7 dias. De 5.500 Kz por 3.599 Kz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesPage,
});

const leaks = [
  {
    icon: Eye,
    title: "Despesas Invisíveis",
    text: "Pequenos gastos diários, subscrições esquecidas e compras por impulso que, somados ao fim do mês, valem mais do que a sua conta de casa.",
  },
  {
    icon: CreditCard,
    title: "Dívidas em Cascata",
    text: "Pede emprestado para pagar o que já devia. O saldo nunca desce, os juros crescem e o salário chega já comprometido.",
  },
  {
    icon: Target,
    title: "Ausência de Metas",
    text: "Sem um objetivo com valor e prazo, o dinheiro escorrega para onde houver menos resistência — e nunca para onde importa.",
  },
];

const days = [
  { icon: Search, title: "Diagnóstico", text: "Saber exatamente a sua situação real." },
  { icon: ClipboardList, title: "Mapeamento", text: "Registo completo de entradas e saídas." },
  { icon: Wallet, title: "Orçamento", text: "Um plano de gastos realista." },
  { icon: Banknote, title: "Dívidas", text: "Estratégia clara para reduzir o que deve." },
  { icon: PiggyBank, title: "Reserva", text: "Início de um fundo de emergência." },
  { icon: Flag, title: "Metas", text: "Objetivos financeiros definidos." },
  { icon: Repeat, title: "Sistema", text: "Rotina para manter tudo a funcionar sozinho." },
];

const deliverables = [
  "Método completo dos 7 dias, com exercícios práticos",
  "Estudo de caso real (aplicação do método passo a passo)",
  "Bónus: Primeiros Passos Para Investir",
  "Bónus: Finanças a Dois ou em Família",
  "Glossário de Termos Financeiros",
  "21 Hábitos Financeiros Diários",
  "Modelos práticos prontos: Orçamento Mensal, Registo Diário de Gastos, Plano de Dívidas, Metas Financeiras e Revisão Semanal/Mensal",
];

const isabelTimeline = [
  { day: "Dia 1", text: "Somou tudo e viu a verdade: 95.000 Kz de renda mensal contra 78.000 Kz de dívida acumulada no cartão." },
  { day: "Dia 2", text: "Registou cada saída durante o dia e descobriu 9.000 Kz por mês em gastos que nem se lembrava de fazer." },
  { day: "Dia 3", text: "Montou um orçamento realista, sem cortes impossíveis, e libertou 14.000 Kz por mês." },
  { day: "Dia 4", text: "Negociou o cartão, juntou as dívidas num só plano e definiu um valor fixo de amortização." },
  { day: "Dia 5", text: "Abriu a reserva de emergência com 3.000 Kz — o primeiro dinheiro que não era de ninguém a não ser dela." },
  { day: "Dia 6", text: "Definiu duas metas com valor e prazo: quitar o cartão e chegar a uma reserva de 12.000 Kz." },
  { day: "Dia 7", text: "Criou a sua rotina: 5 minutos por dia e uma revisão ao domingo. Três meses depois, cartão quitado e 12.000 Kz de reserva." },
];

const faqs = [
  {
    q: "E se eu não tiver nenhuma margem para poupar?",
    a: "É precisamente aí que o método começa a funcionar. Nos dois primeiros dias não lhe pedimos para poupar nada — pedimos para ver. Quase toda a gente encontra margem onde jurava não existir, porque o problema raramente é só o valor que entra: é o que sai sem ser notado. Se, depois de mapear, a margem continuar a zero, o trabalho passa a ser sobre dívidas e rendimento, e o e-book mostra-lhe esse caminho.",
  },
  {
    q: "Quanto tempo até ver resultados reais?",
    a: "A clareza chega em sete dias — no fim da semana sabe exatamente quanto entra, quanto sai e para onde vai. O resultado financeiro visível costuma aparecer entre o primeiro e o terceiro mês, à medida que o plano de dívidas e a reserva ganham ritmo.",
  },
  {
    q: "E se eu tiver muitas dívidas e parecer impossível?",
    a: "Dívida grande assusta enquanto é um número vago. Escrita, ordenada e com um plano por cima, deixa de ser um monstro e passa a ser uma sequência de passos. O Dia 4 é dedicado a isso: listar tudo, perceber os juros, escolher a ordem de ataque e definir um valor fixo mensal que caiba no seu orçamento.",
  },
  {
    q: "Preciso de refazer os sete dias todos os meses?",
    a: "Não. Os sete dias são a montagem do sistema, faz-se uma vez. Depois fica com uma rotina de poucos minutos por dia e uma revisão semanal e mensal. Refazer a semana completa só faz sentido quando algo muda muito: novo emprego, mudança de casa ou de estrutura familiar.",
  },
  {
    q: "Vale a pena organizar as finanças se eu ganho muito pouco?",
    a: "Vale ainda mais. Quem tem pouca margem é quem mais sofre com cada erro e com cada gasto invisível. Organizar não faz o salário crescer de um dia para o outro, mas faz com que cada kwanza que entra seja usado por decisão sua — e é essa mudança que trava o ciclo de dívida.",
  },
];

function SalesPage() {
  return (
    <main className="relative overflow-x-hidden bg-background">
      <GoldBackdrop />
      <Hero />
      <Problema />
      <Metodo />
      <Receber />
      <EstudoCaso />
      <Oferta />
      <Garantia />
      <Faq />
      <Rodape />
      <StickyBar />
    </main>
  );
}

function GoldBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-gold/5 blur-[120px]" />
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}

function Hero() {
  return (
    <section className="relative px-5 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Educação Financeira
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] sm:text-5xl md:text-6xl">
              7 Dias Para <span className="text-gradient-gold">Organizar</span> as Suas Finanças
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 font-display text-lg font-bold text-gold sm:text-xl">
              Se não funcionar, devolvemos o seu dinheiro em 7 dias!
            </p>
          </Reveal>

          <Reveal delay={240}>
            <blockquote className="mt-6 border-l-2 border-gold/60 pl-4 text-sm italic text-muted-foreground sm:text-base">
              «Não espere condições perfeitas. Nunca haverá um momento perfeito para começar.»
              <footer className="mt-1 not-italic text-xs text-gold/80">— Alan Lakein</footer>
            </blockquote>
          </Reveal>

          <Reveal delay={300}>
            <div className="surface-card mt-8 inline-flex flex-wrap items-end gap-x-4 gap-y-1 rounded-2xl px-6 py-5">
              <span className="text-sm text-muted-foreground line-through">De 5.500 Kz</span>
              <span className="text-sm text-muted-foreground">por apenas</span>
              <span className="font-display text-3xl font-black text-gold sm:text-4xl">
                <CountUp to={3599} /> Kz
              </span>
            </div>
          </Reveal>

          <Reveal delay={360} className="mt-8">
            <CTAButton>
              Comprar Agora <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </CTAButton>
            <p className="mt-4 text-sm text-muted-foreground">
              Clique no botão Comprar e mude a tua situação financeira.
            </p>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={200} className="relative">
          <div className="absolute inset-8 rounded-full bg-gold/15 blur-[90px]" aria-hidden />
          <img
            src={ebookCover}
            alt="Mockup 3D do e-book Educação Financeira: 7 Dias Para Organizar as Suas Finanças"
            width={1024}
            height={1024}
            className="relative mx-auto w-full max-w-md animate-float drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Problema() {
  return (
    <section className="px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="O problema"
          title="Porque o Seu Dinheiro Nunca Chega"
          subtitle="O salário entra e, durante dois dias, parece que está tudo bem. Depois saem as contas, os transportes, a comida, o imprevisto de sempre. Por volta do dia 20, já não sobra nada — e ninguém sabe explicar exatamente para onde foi."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {leaks.map((leak, i) => (
            <Reveal key={leak.title} delay={i * 120}>
              <article className="surface-card surface-card-hover h-full rounded-2xl p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold">
                  <leak.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{leak.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{leak.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12">
          <div className="mx-auto flex max-w-3xl items-start gap-4 rounded-2xl border border-gold/40 bg-gold/[0.06] p-6 sm:p-8">
            <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-gold" aria-hidden />
            <div className="min-w-0">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">
                Reflexão rápida
              </p>
              <p className="mt-2 text-lg font-semibold sm:text-xl">
                Sabe, sem olhar para o telemóvel, quanto gastou no mês passado?
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Metodo() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight * 0.5;
      const done = window.innerHeight * 0.85 - rect.top;
      setProgress(Math.min(Math.max(done / total, 0), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return (
    <section id="metodo" className="px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="O método"
          title="O Método da Semana Financeira"
          subtitle="7 dias, 7 ações, um resultado final: clareza total sobre o seu dinheiro."
        />

        <div ref={ref} className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-[1.35rem] top-0 hidden h-full w-[2px] bg-border md:block"
          >
            <div
              className="w-full bg-[image:var(--gradient-gold)] transition-[height] duration-200 ease-out"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:pl-16 lg:grid-cols-3">
            {days.map((day, i) => (
              <Reveal key={day.title} delay={i * 90} variant="up">
                <article className="surface-card surface-card-hover group h-full rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-gold">
                      Dia {i + 1}
                    </span>
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold transition-transform duration-500 ${
                        inView ? "rotate-0 scale-100" : "-rotate-45 scale-75"
                      }`}
                    >
                      <day.icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{day.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{day.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120} className="mt-12 text-center">
          <CTAButton>
            Comprar Agora <ArrowRight className="h-5 w-5" />
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}

function Receber() {
  const { ref, inView } = useInView<HTMLUListElement>(0.15);

  return (
    <section className="px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Conteúdo" title="Ao Comprar o E-book, Você Recebe:" />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <ul ref={ref} className="space-y-4">
            {deliverables.map((item, i) => (
              <li
                key={item}
                style={{ transitionDelay: `${i * 130}ms` }}
                className={`flex items-start gap-4 rounded-xl border border-border bg-card/60 p-4 transition-all duration-600 ${
                  inView ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                }`}
              >
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 text-sm leading-relaxed text-foreground sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <Reveal variant="right" className="relative">
            <div className="absolute inset-10 rounded-full bg-gold/10 blur-[80px]" aria-hidden />
            <img
              src={ebookCover}
              alt="Capa do e-book Educação Financeira com os bónus incluídos"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative mx-auto w-full max-w-sm animate-float"
            />
            <div className="mt-6 text-center">
              <CTAButton size="md">Comprar</CTAButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EstudoCaso() {
  return (
    <section className="px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="Estudo de caso"
          title="Veja o Que é Possível em 7 Dias"
          subtitle="A história da Isabel, tal como aparece no e-book: 95.000 Kz de renda mensal, 78.000 Kz de dívida no cartão e a sensação de que nunca sairia dali."
        />

        <div className="mt-14 space-y-4">
          {isabelTimeline.map((step, i) => (
            <Reveal key={step.day} delay={i * 90} variant="left">
              <div className="surface-card surface-card-hover flex gap-5 rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col items-center">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/10 font-display text-sm font-bold text-gold">
                    {i + 1}
                  </span>
                  {i < isabelTimeline.length - 1 ? (
                    <span aria-hidden className="mt-2 w-px flex-1 bg-gold/25" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">
                    {step.day}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-gold/40 bg-gold/[0.06] p-6 text-center">
            <p className="font-display text-3xl font-black text-gold">
              <CountUp to={78000} /> Kz
            </p>
            <p className="mt-1 text-sm text-muted-foreground">de dívida quitada em 3 meses</p>
          </div>
          <div className="rounded-2xl border border-gold/40 bg-gold/[0.06] p-6 text-center">
            <p className="font-display text-3xl font-black text-gold">
              <CountUp to={12000} /> Kz
            </p>
            <p className="mt-1 text-sm text-muted-foreground">de reserva de emergência criada</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Oferta() {
  return (
    <section id="oferta" className="px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Oferta" title="Garanta Já o Seu Acesso" />

        <Reveal variant="scale" delay={120} className="mt-12">
          <div className="surface-card relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <div
              aria-hidden
              className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/20 blur-[90px]"
            />
            <p className="relative text-base text-muted-foreground line-through">De 5.500 Kz</p>
            <p className="relative mt-2 font-display text-6xl font-black text-gradient-gold sm:text-7xl">
              <CountUp to={3599} /> Kz
            </p>
            <p className="relative mt-2 text-sm text-muted-foreground">
              Pagamento único · Sem mensalidades
            </p>

            <ul className="relative mx-auto mt-8 max-w-sm space-y-3 text-left">
              {[
                "Acesso imediato após a compra",
                "Acesso vitalício, sem prazo de validade",
                "Todos os bónus e modelos incluídos",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm sm:text-base">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>

            <div className="relative mt-10">
              <CTAButton href={CHECKOUT_URL} trackAs="InitiateCheckout">
                Comprar Agora <ArrowRight className="h-5 w-5" />
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Garantia() {
  return (
    <section className="px-5 py-20 sm:py-24">
      <Reveal variant="scale" className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-gold bg-gold/10 shadow-[var(--shadow-gold)]">
          <ShieldCheck className="h-7 w-7 text-gold" aria-hidden />
          <span className="mt-1 font-display text-2xl font-black leading-none text-gold">7</span>
          <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold">
            Dias
          </span>
        </div>
        <h2 className="mt-8 text-3xl font-extrabold sm:text-4xl">
          Você Satisfeito ou o Seu Dinheiro de Volta
        </h2>
        <p className="mt-5 font-display text-xl font-bold text-gold sm:text-2xl">
          Se não funcionar, devolvemos o seu dinheiro em 7 dias!
        </p>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Aplique o método durante uma semana. Se sentir que não trouxe clareza nenhuma às suas
          finanças, basta pedir e o valor é devolvido por inteiro. O risco é todo nosso.
        </p>
      </Reveal>
    </section>
  );
}

function Faq() {
  return (
    <section className="px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas Frequentes" />

        <Reveal delay={100} className="mt-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="surface-card rounded-2xl border px-5 last:border-b"
              >
                <AccordionTrigger className="text-left font-display text-base font-bold hover:no-underline sm:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={150} className="mt-12 text-center">
          <CTAButton>
            Comprar Agora <ArrowRight className="h-5 w-5" />
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="border-t border-border px-5 pb-28 pt-16 sm:pb-16">
      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 font-display text-lg font-black uppercase tracking-[0.2em] text-gold">
          <Coins className="h-5 w-5" aria-hidden />
          Educação Financeira
        </div>
        <p className="mt-5 text-sm text-muted-foreground sm:text-base">
          Precisa de ajuda para garantir o seu e-book?
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/244900000000"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
          </a>
          <a
            href="mailto:suporte@educacaofinanceira.ao"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-gold/50 hover:text-gold"
          >
            <Mail className="h-4 w-4" aria-hidden /> E-mail
          </a>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <Instagram className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="https://wa.me/244900000000"
            aria-label="WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="mailto:suporte@educacaofinanceira.ao"
            aria-label="E-mail"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <Mail className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Educação Financeira. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-background/95 px-4 py-3 backdrop-blur transition-transform duration-500 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground line-through">5.500 Kz</p>
          <p className="truncate font-display text-lg font-black text-gold">3.599 Kz</p>
        </div>
        <CTAButton
          size="md"
          className="shrink-0"
          href={CHECKOUT_URL}
          trackAs="InitiateCheckout"
        >
          Comprar
        </CTAButton>
      </div>
    </div>
  );
}

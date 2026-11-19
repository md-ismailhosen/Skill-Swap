import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from 'lucide-react'
import AOS from 'aos'
import skills from '../data/skills.json'
import SkillCard from '../components/SkillCard.jsx'

const slides = [
  {
    kicker: 'Your neighborhood, full of possibility',
    title: 'The best things you learn are shared.',
    description: 'Meet the talented people around you. Trade a little know-how, discover a new passion, and make your community feel closer.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=88',
    action: 'Explore local skills',
    to: '#popular-skills',
  },
  {
    kicker: 'A new skill is closer than you think',
    title: 'Learn something lovely. Right around the corner.',
    description: 'From first guitar chords to a really good sourdough, find welcoming lessons led by neighbors who love what they do.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2000&q=88',
    action: 'Find your next lesson',
    to: '#popular-skills',
  },
  {
    kicker: 'Everyone has something to share',
    title: 'Your talent could be someone’s next favorite thing.',
    description: 'Teach what you know, meet great people, and turn your everyday skills into meaningful moments.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=88',
    action: 'Share your skill',
    to: '/register',
  },
]

const providers = [
  ...skills
    .slice()
    .sort((first, second) => second.rating - first.rating)
    .slice(0, 4)
    .map((skill) => ({
      name: skill.providerName,
      skill: skill.skillName,
      rating: skill.rating,
      email: skill.providerEmail,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.providerName)}&background=eaf3ec&color=2e7650`,
    })),
]

const benefits = [
  { icon: HeartHandshake, title: 'Real community', text: 'Meet people nearby and build connections that go beyond a lesson.' },
  { icon: ShieldCheck, title: 'People you can trust', text: 'Find thoughtful profiles, genuine reviews, and a welcoming space.' },
  { icon: Sparkles, title: 'Your kind of learning', text: 'Choose a pace, place, and skill that fit the way you like to learn.' },
  { icon: UsersRound, title: 'Everyone brings something', text: 'Share your own experience and make someone else’s day a little brighter.' },
]

function Home() {
  useEffect(() => {
    AOS.refresh()
  }, [])

  return (
    <>
      <section className="hero-shell" aria-label="Discover SkillSwap">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          speed={800}
          aria-label="SkillSwap highlights"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="hero-slide" style={{ backgroundImage: `url("${slide.image}")` }}>
                <div className="hero-content">
                  <span className="hero-kicker"><Sparkles size={14} /> {slide.kicker}</span>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-description">{slide.description}</p>
                  <div className="hero-actions">
                    <Link className="button-primary" to={slide.to}>
                      {slide.action} <ArrowRight size={17} />
                    </Link>
                    <a className="button-light" href="#how-it-works">How it works <ArrowDown size={16} /></a>
                  </div>
                  <div className="hero-note">
                    <UsersRound size={17} /> <span><strong>Good at something?</strong> There’s a neighbor ready to learn.</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="section-space" id="popular-skills">
        <div className="container">
          <div className="section-topline" data-aos="fade-up">
            <div>
              <span className="eyebrow">Good things to learn</span>
              <h2 className="section-heading">Popular in your community</h2>
              <p className="section-copy">Explore eight neighbor-led lessons and find something new to try.</p>
            </div>
            <a className="text-link" href="#top-providers">Meet the people teaching <ArrowRight size={16} /></a>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => <SkillCard key={skill.skillId} skill={skill} />)}
          </div>
        </div>
      </section>

      <section className="providers-section section-space" id="top-providers">
        <div className="container">
          <div className="section-topline" data-aos="fade-up">
            <div>
              <span className="eyebrow">Good people, great teachers</span>
              <h2 className="section-heading">Meet our top-rated neighbors</h2>
              <p className="section-copy">Kind, patient, and always happy to share what they know.</p>
            </div>
            <Link className="text-link" to="/register">Become a provider <ArrowUpRight size={16} /></Link>
          </div>
          <div className="providers-grid">
            {providers.map((provider, index) => (
              <article className="provider-card" key={provider.name} data-aos="fade-up" data-aos-delay={index * 70}>
                <img className="provider-large-avatar" src={provider.avatar} alt={provider.name} loading="lazy" />
                <h3 className="provider-name">{provider.name}</h3>
                <p className="provider-location"><MapPin size={13} /> SkillSwap community</p>
                <span className="provider-specialty">{provider.skill}</span>
                <div className="provider-rating">
                  <span className="rating"><Star size={14} fill="currentColor" /> {provider.rating}</span>
                </div>
                <a className="provider-email" href={`mailto:${provider.email}`}>{provider.email}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space" id="how-it-works">
        <div className="container">
          <div data-aos="fade-up">
            <span className="eyebrow">Easy as saying hello</span>
            <h2 className="section-heading">A little know-how goes a long way</h2>
            <p className="section-copy">Three simple steps to learn something new or share what you love.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card" data-aos="fade-up">
              <span className="step-number">01</span>
              <h3>Offer what you know</h3>
              <p>Create a friendly profile, share a skill you enjoy, and tell your neighbors how you can help.</p>
              <ArrowRight className="step-arrow" size={20} />
            </article>
            <article className="step-card" data-aos="fade-up" data-aos-delay="100">
              <span className="step-number">02</span>
              <h3>Discover your next thing</h3>
              <p>Browse local lessons, find a teacher who feels like a good fit, and ask any questions.</p>
              <ArrowRight className="step-arrow" size={20} />
            </article>
            <article className="step-card" data-aos="fade-up" data-aos-delay="200">
              <span className="step-number">03</span>
              <h3>Book, meet & grow</h3>
              <p>Arrange a time together, enjoy learning in person or online, and leave a kind review.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="container">
          <div className="why-panel" data-aos="fade-up">
            <div className="why-intro">
              <span className="eyebrow">More than a marketplace</span>
              <h2 className="section-heading">Why join SkillSwap?</h2>
              <p className="section-copy">Because sharing what you know makes your neighborhood a little more wonderful.</p>
            </div>
            <div className="benefits-grid">
              {benefits.map(({ icon: Icon, title, text }, index) => (
                <article className="benefit-card" key={title} data-aos="fade-up" data-aos-delay={index * 70}>
                  <span className="benefit-icon"><Icon size={20} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-panel" data-aos="fade-up">
            <div>
              <h2>There’s something wonderful you can teach.</h2>
              <p>Join your neighbors. Share a skill, find your people, and let good things grow.</p>
            </div>
            <Link className="button-light" to="/register">Join SkillSwap <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

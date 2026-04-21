import {
  Brain,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-20 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-md gradient-primary flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">PsiAgenda</span>
            </NavLink>
            <p className="text-background/60 leading-relaxed max-w-xs text-sm">
              Nuestra misión es facilitar el acceso a la salud mental a través
              de tecnología innovadora y profesionales comprometidos con tu
              bienestar.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">Explorar</h4>
            <ul className="flex flex-col gap-4 text-sm text-background/60">
              <li>
                <a
                  href="#servicios"
                  className="hover:text-primary transition-colors"
                >
                  Nuestros Servicios
                </a>
              </li>
              <li>
                <a
                  href="#profesionales"
                  className="hover:text-primary transition-colors"
                >
                  Psicólogos
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog de Bienestar
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">Soporte</h4>
            <ul className="flex flex-col gap-4 text-sm text-background/60">
              <li>
                <a
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                  Tu Cuenta
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="hover:text-primary transition-colors"
                >
                  Agendar Cita
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contacto</h4>
            <ul className="flex flex-col gap-4 text-sm text-background/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Calle Salud Mental 123, Edificio Bienestar, Piso 4.</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>contacto@psiagenda.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-background/40">
            © 2026 PsiAgenda. Todos los derechos reservados. Desarrollado con ❤️
            para tu bienestar.
          </p>
          <div className="flex gap-8 text-xs text-background/30 font-medium">
            <a
              href="#"
              className="hover:text-white transition-colors uppercase tracking-widest"
            >
              Términos de Servicio
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors uppercase tracking-widest"
            >
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

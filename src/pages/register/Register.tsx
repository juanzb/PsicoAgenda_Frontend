import {
  Brain,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../../components/ui/button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/card/Card";
import { PATHS } from "../../app/router/paths";

type TRegisterStep = "details" | "otp";

export function RegistrePage(): ReactNode {
  const [step, setStep] = useState<TRegisterStep>("details");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const passwordsMatch = password === confirmPassword;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) return;

    setIsLoading(true);
    // Simulación de envío de OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de verificación final
    setTimeout(() => {
      setIsLoading(false);
      navigate(PATHS.ADMIN.DASHBOARD);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <NavLink to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-foreground">
              PsiAgenda
            </span>
          </NavLink>
        </div>

        {step === "details" ? (
          <Card className="border-none shadow-elevated overflow-hidden rounded-lg">
            <CardHeader className="pt-8 pb-4 text-center">
              <CardTitle className="text-2xl font-bold">
                Crear tu cuenta
              </CardTitle>
              <CardDescription>
                Únete a la mejor plataforma para psicólogos
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground ml-1">
                    Nombre Completo
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Juan Pérez"
                      className="w-full pl-11 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground ml-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      className="w-full pl-11 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground ml-1">
                    WhatsApp / Contacto
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+57 300 000 0000"
                      className="w-full pl-11 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">
                      Contraseña
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pr-10 pl-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">
                      Confirmar
                    </label>
                    <div className="relative group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full pr-10 pl-4 py-3 bg-muted/50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${
                          confirmPassword && !passwordsMatch
                            ? "border-destructive focus:ring-destructive/20"
                            : "border-border focus:ring-primary/20 focus:border-primary"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {confirmPassword && !passwordsMatch && (
                  <p className="text-[10px] text-destructive font-bold uppercase tracking-wider ml-1 animate-in fade-in slide-in-from-top-1">
                    Las contraseñas no coinciden
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-lg h-12 text-base font-bold gradient-primary shadow-lg shadow-primary/20 mt-4"
                  isLoading={isLoading}
                  disabled={!passwordsMatch || !password}
                >
                  Continuar y enviar código
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pb-8">
              <p className="text-sm text-muted-foreground text-center">
                ¿Ya tienes una cuenta?{" "}
                <NavLink
                  to={PATHS.LOGIN}
                  className="text-primary font-bold hover:underline transition-all"
                >
                  Inicia Sesión
                </NavLink>
              </p>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-none shadow-elevated overflow-hidden rounded-lg animate-slide-up">
            <CardHeader className="pt-8 pb-4 text-center">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Verifica tu cuenta
              </CardTitle>
              <CardDescription>
                Hemos enviado un código de 6 dígitos a tu WhatsApp. Ingrésalo
                para continuar.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleVerifyOtp} className="space-y-8">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-11 h-13 text-center text-xl font-bold bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full rounded-lg h-12 text-base font-bold gradient-primary shadow-lg shadow-primary/20"
                    isLoading={isLoading}
                    disabled={otp.some((d) => d === "")}
                  >
                    Verificar y Finalizar
                  </Button>

                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="w-full text-sm text-muted-foreground hover:text-primary font-medium transition-colors"
                  >
                    ¿Número incorrecto? Volver atrás
                  </button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="pb-8 justify-center">
              <p className="text-[10px] text-muted-foreground text-center px-6 leading-relaxed uppercase font-bold tracking-widest opacity-60">
                Seguridad garantizada por PsiAgenda 2026
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

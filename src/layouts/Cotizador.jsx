import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Cotizador() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    document: "",
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (
      !form.fname ||
      !form.lname ||
      !form.email ||
      !form.phone ||
      !form.document
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/createClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: form.fname,
          lname: form.lname,
          email: form.email,
          phone: form.phone,
          document: form.document,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el formulario");
      }

      // Confetti solo cuando se envía exitosamente
      requestAnimationFrame(() => {
        const end = Date.now() + 2.5 * 1000;
        const colors = ["#00c48c", "#ffffff", "#00704a", "#b2f5ea"];

        const frame = () => {
          confetti({
            particleCount: 6,
            startVelocity: 35,
            spread: 70,
            ticks: 90,
            gravity: 0.6,
            origin: { x: Math.random(), y: Math.random() * 0.4 + 0.3 },
            colors,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };

        frame();
      });

      // Limpiar formulario
      setForm({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        document: "",
      });

      console.log("Formulario enviado exitosamente:", result);
      alert(
        "¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto."
      );
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Hubo un error al enviar el formulario. Por favor, intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-1/2 right-0 z-50 flex items-center transform -translate-y-1/2 pointer-events-none">
      {/* Panel principal */}
      <div
        className={`bg-secondary-green text-white rounded-tl-[40px] sm:rounded-tl-[60px] rounded-br-[40px] sm:rounded-br-[60px] shadow-2xl transform transition-all duration-700 w-[calc(100vw-1.5rem)] sm:w-[420px] md:w-[480px] max-h-[90vh] overflow-y-auto ${
          isOpen
            ? "translate-x-0 opacity-100 ease-[cubic-bezier(0.22,1.61,0.36,1)] pointer-events-auto"
            : "translate-x-full opacity-0 ease-in pointer-events-none"
        }`}
        style={{
          marginRight: isOpen ? "0.75rem" : "0",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleToggle}
          className="absolute top-0 right-3 sm:right-4 rounded-full p-2 bg-black/30 backdrop-blur-md hover:bg-white hover:text-secondary-green hover:scale-110 transition-all ease-in-out duration-300 shadow-xl z-10"
        >
          <X className="size-7 sm:size-8" />
        </button>

        {/* Contenido */}
        <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
          <div className="w-full flex flex-col items-center justify-center mb-5 sm:mb-6">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-center mb-3 uppercase leading-tight">
              Estás a un paso de tu próximo departamento
            </h3>
            <p className="text-base sm:text-lg font-light uppercase">
              Regístrate aquí
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:gap-4"
          >
            <div className="flex flex-row w-full gap-5">
              {/* Nombre */}
              <input
                type="text"
                name="fname"
                placeholder="NOMBRE"
                required
                value={form.fname}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-2.5 sm:p-3 bg-transparent text-white text-sm sm:text-base placeholder-white/90 outline-none border-2 border-white/60 focus:border-white transition-all duration-300 disabled:opacity-50"
              />

              {/* Apellido */}
              <input
                type="text"
                name="lname"
                placeholder="APELLIDO"
                required
                value={form.lname}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-2.5 sm:p-3 bg-transparent text-white text-sm sm:text-base placeholder-white/90 outline-none border-2 border-white/60 focus:border-white transition-all duration-300 disabled:opacity-50"
              />
            </div>

            <input
              type="text"
              name="document"
              placeholder="DNI"
              required
              value={form.document}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-2.5 sm:p-3 bg-transparent text-white text-sm sm:text-base placeholder-white/90 outline-none border-2 border-white/60 focus:border-white transition-all duration-300 disabled:opacity-50"
            />

            {/* Celular */}
            <input
              type="tel"
              name="phone"
              placeholder="CELULAR"
              required
              value={form.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              maxLength={9}
              minLength={9}
              pattern="[0-9]*"
              inputMode="numeric"
              className="w-full p-2.5 sm:p-3 bg-transparent text-white text-sm sm:text-base placeholder-white/90 outline-none border-2 border-white/60 focus:border-white transition-all duration-300 disabled:opacity-50"
            />

            {/* Correo */}
            <input
              type="email"
              name="email"
              placeholder="CORREO"
              required
              value={form.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-2.5 sm:p-3 bg-transparent text-white text-sm sm:text-base placeholder-white/90 outline-none border-2 border-white/60 focus:border-white transition-all duration-300 disabled:opacity-50"
            />

            {/* Botón Enviar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto mx-auto px-8 sm:px-10 py-2 sm:py-2.5 border-2 border-white rounded-lg text-base sm:text-lg font-bold text-secondary-green bg-white shadow-lg hover:text-white hover:bg-transparent hover:scale-105 transition-all duration-300 ease-in-out uppercase disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
            </button>
          </form>
        </div>
      </div>

      {/* Botón lateral "COTIZA AQUÍ" */}
      <button
        onClick={handleToggle}
        className={`${
          !isOpen ? "flex" : "hidden"
        } bg-white/95 text-secondary-green font-bold px-3 sm:px-4 py-2 sm:py-4 rounded-tr-[30px] rounded-br-[30px] cursor-pointer shadow-2xl flex-row justify-center items-center gap-2 text-xl sm:text-2xl lg:text-3xl border-2 border-white hover:bg-secondary-green hover:text-white transition-all ease-in-out duration-300 pointer-events-auto`}
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        <span className="tracking-widest font-extrabold">COTIZA AQUÍ</span>
        <ChevronRight className="size-7 sm:size-8 lg:size-10 font-extrabold" />
      </button>
    </div>
  );
}

'use client';

import type { FormEvent } from 'react';

export default function NewsletterForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert('¡Gracias por suscribirte!');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        placeholder="Tu correo electrónico"
        required
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-[#0054a6] hover:bg-[#004080] text-white text-sm font-semibold py-2.5 rounded-lg transition"
      >
        Suscribirme
      </button>
    </form>
  );
}

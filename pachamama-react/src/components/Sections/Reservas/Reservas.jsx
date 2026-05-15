import { useMemo, useState } from "react";

import { ScrollTopButton } from "../../ScrollTopButton/ScrollTopButton";

import {
  hospedagens,
  paymentMethods,
} from "./reservasData";

export function Reservas({ scrollToHeader }) {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cpf: "",
    birthDate: "",
    guests: 1,

    cep: "",
    address: "",
    number: "",
    city: "",
    state: "",

    hospedagem: "suite",
    checkin: "",
    checkout: "",
    extraBed: false,

    paymentMethod: "Cartão de Crédito",

    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

const [guestError, setGuestError] = useState("");

  function handleChange(event) {

  const {
    name,
    value,
    type,
    checked,
  } = event.target;

  if (name === "guests") {

    const guestValue = Number(value);

    const maxGuests =
      formData.hospedagem === "chale" &&
      formData.extraBed
        ? 3
        : 2;

    if (guestValue > maxGuests) {

      setGuestError(
        `O número máximo é ${maxGuests} hóspede(s) para esta acomodação`
      );

      return;
    }

    setGuestError("");
  }

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  }));
}

async function handleCepBlur(event) {

  const cep = event.target.value
    .replace(/\D/g, "");

  if (cep.length !== 8) return;

  try {

    const response = await fetch(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      address: data.logradouro || "",
      city: data.localidade || "",
      state: data.uf || "",
    }));

  } catch (error) {

    console.error("Erro ao buscar CEP", error);

  }
}

  const selectedHospedagem = useMemo(() => {
    
    return hospedagens.find(
      (item) => item.id === formData.hospedagem
    );

  }, [formData.hospedagem]);
  const totalNights = useMemo(() => {

  if (!formData.checkin || !formData.checkout) {
    return 0;
  }

  const checkin = new Date(formData.checkin);

  const checkout = new Date(formData.checkout);

  const differenceInTime =
    checkout.getTime() - checkin.getTime();

  const differenceInDays =
    differenceInTime / (1000 * 60 * 60 * 24);

  return differenceInDays > 0
    ? differenceInDays
    : 0;

}, [formData.checkin, formData.checkout]);

  const total = useMemo(() => {

  let totalValue =
    selectedHospedagem.price * totalNights;

  if (
    formData.extraBed &&
    formData.hospedagem === "chale"
  ) {
    totalValue += totalValue * 0.3;
  }

  return totalValue;

}, [
  selectedHospedagem,
  totalNights,
  formData.extraBed,
  formData.hospedagem,
]);

  return (
    <section
      id="reservas"
      className="py-20 px-6 max-w-6xl mx-auto"
    >

      {/* Header */}
      <div className="mb-14">

        <h2 className="text-5xl font-bold text-stone-800">
          Faça sua Reserva
        </h2>

        <p className="text-stone-500 mt-4 text-lg">
          Reserve sua experiência no Pachamama
        </p>

      </div>

      {/* Form */}
      <form
        className="
          bg-white
          rounded-[2rem]
          shadow-2xl
          border
          border-stone-100
          p-8
          md:p-12
        "
      >

        <div className="grid gap-12">

          {/* DADOS PESSOAIS */}
          <div>

            <h3 className="text-3xl font-bold text-stone-800 mb-8">
              Dados do Hóspede
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="firstName"
                placeholder="Nome"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Sobrenome"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

              <input
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Telefone"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

              <input
                type="text"
                name="cpf"
                placeholder="CPF"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

              <input
                type="date"
                name="birthDate"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

            </div>

          </div>

          {/* ENDEREÇO */}
          <div>

            <h3 className="text-3xl font-bold text-stone-800 mb-8">
              Endereço
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <input
  type="text"
  name="cep"
  placeholder="CEP"
  maxLength={9}
  onChange={handleChange}
  onBlur={handleCepBlur}
  className="
    border
    border-stone-200
    p-4
    rounded-2xl
  "
/>

              <input
  type="text"
  name="address"
  placeholder="Rua"
  value={formData.address}
  onChange={handleChange}
  className="
    border
    border-stone-200
    p-4
    rounded-2xl
  "
/>
              <input
                type="text"
                name="number"
                placeholder="Número"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

              <input
  type="text"
  name="city"
  placeholder="Cidade"
  value={formData.city}
  onChange={handleChange}
  className="
    border
    border-stone-200
    p-4
    rounded-2xl
  "
/>

              <input
  type="text"
  name="state"
  placeholder="Estado"
  value={formData.state}
  onChange={handleChange}
  className="
    border
    border-stone-200
    p-4
    rounded-2xl
  "
/>

            </div>

          </div>

          {/* HOSPEDAGEM */}
          <div>

            <h3 className="text-3xl font-bold text-stone-800 mb-8">
              Hospedagem
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <select
                name="hospedagem"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              >

                {hospedagens.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name} - R$ {item.price}/noite
                  </option>

                ))}

              </select>

<div className="relative">

  {guestError && (

    <div
      className="
        absolute
        -top-16
        left-0

        bg-red-500
        text-white

        px-5
        py-3

        rounded-2xl

        shadow-xl

        text-sm
        font-medium

        animate-[fadeIn_.3s_ease]

        z-50
      "
    >

      {guestError}

      {/* seta */}
      <div
        className="
          absolute
          -bottom-2
          left-6

          w-4
          h-4

          bg-red-500

          rotate-45
        "
      />

    </div>

  )}

  <input
    type="number"
    name="guests"
    min="1"
    value={formData.guests}
    onChange={handleChange}
    placeholder="Quantidade de hóspedes"
    className={`
      w-full
      border
      p-4
      rounded-2xl
      transition-all

      ${
        guestError
          ? "border-red-500 ring-4 ring-red-200"
          : "border-stone-200"
      }
    `}
  />

</div>
{formData.hospedagem === "chale" && (
<label
    className="
      flex
      items-center
      gap-4
      bg-stone-100
      p-5
      rounded-2xl
    "
  >

    <input
      type="checkbox"
      name="extraBed"
      checked={formData.extraBed}
      onChange={handleChange}
      className="w-5 h-5"
    />

    <div>

      <p className="font-semibold text-stone-800">
        Adicionar cama extra
      </p>

      <p className="text-sm text-stone-500">
        Acréscimo de 30% no valor total
      </p>

    </div>

  </label>

)}

              <input
                type="date"
                name="checkin"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

              <input
                type="date"
                name="checkout"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

            </div>

          </div>

          {/* RESUMO */}
          <div
  className="
    bg-stone-100
    rounded-[2rem]
    p-8
  "
>

  <h3 className="text-3xl font-bold text-stone-800">
    Total da Reserva
  </h3>

  <p className="text-stone-500 mt-3">
    {selectedHospedagem.name}
  </p>

  <p className="text-stone-500 mt-2">
    {totalNights} diária(s)
  </p>

  {formData.extraBed && (

    <p className="text-stone-500 mt-2">
      Cama extra incluída (+30%)
    </p>

  )}

  <h4 className="text-5xl font-bold mt-6 text-stone-900">
    R$ {total}
  </h4>

</div>

          {/* PAGAMENTO */}
          <div>

            <h3 className="text-3xl font-bold text-stone-800 mb-8">
              Pagamento Seguro
            </h3>

            <div className="grid gap-6">

              <select
                name="paymentMethod"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              >

                {paymentMethods.map((method) => (

                  <option
                    key={method}
                    value={method}
                  >
                    {method}
                  </option>

                ))}

              </select>

              <input
                type="text"
                name="cardName"
                placeholder="Nome impresso no cartão"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

              <input
                type="text"
                name="cardNumber"
                placeholder="Número do cartão"
                onChange={handleChange}
                className="border border-stone-200 p-4 rounded-2xl"
              />

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="MM/AA"
                  onChange={handleChange}
                  className="border border-stone-200 p-4 rounded-2xl"
                />

                <input
                  type="text"
                  name="cardCVV"
                  placeholder="CVV"
                  onChange={handleChange}
                  className="border border-stone-200 p-4 rounded-2xl"
                />

              </div>

            </div>

          </div>

          {/* BOTÕES */}
          <div className="grid md:grid-cols-2 gap-6">

            <button
              type="button"
              className="
                bg-stone-200
                hover:bg-stone-300
                transition
                py-5
                rounded-2xl
                font-semibold
              "
            >
              Gerar Boleto
            </button>

            <button
              type="submit"
              className="
                bg-black
                hover:bg-stone-800
                transition
                text-white
                py-5
                rounded-2xl
                text-lg
                font-bold
              "
            >
              Finalizar Reserva
            </button>

          </div>

        </div>

      </form>

      <ScrollTopButton scrollToHeader={scrollToHeader} />

    </section>
  );
}
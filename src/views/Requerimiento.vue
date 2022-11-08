<template>
  <v-flex class="mt-n1">
    <v-row>
      <v-img
        style="filter: brightness(50%)"
        width="100%"
        max-height="300px"
        src="../assets/fondo/mercedes-min.jpg"
      >
        <!-- <v-layout justify-center align-center fill-height>
          <span
            data-aos="fade-down"
            data-aos-duration="2000"
            style="font-size: 64px"
            class="my-application4 white--text"
            >Requisitos
          </span>
        </v-layout> -->
        <!-- <v-layout>
          <span style="font-size: 64px" class="my-application4 white--text"
            >Requisitos</span
          >
        </v-layout> -->
      </v-img>
    </v-row>

    <v-row justify="center" align="center">
      <v-layout justify-center style="margin-top: -300px; position: relative">
        <span
          data-aos="fade-down"
          data-aos-duration="1500"
          style="font-size: 60px"
          class="my-application4 white--text"
          >{{ $t("menuAppBar.requisitos") }}</span
        >
      </v-layout>
    </v-row>
    <v-row style="background-color: #f5f5f5" align="center" justify="center">
      <v-container>
        <v-col cols="12" md="12">
          <v-row class="mt-5" align="center" justify="center">
            <v-col cols="12" md="7">
              <v-img contain :aspect-ratio="16 / 9" src="../assets/req1.jpg">
              </v-img>

              <!-- <v-row justify="center">
            <v-col cols="12" class="d-flex align-center">
              <h1 class="font-weight-light display-1 mt-8">
                REQUISITOS BÁSICOS
              </h1>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n4">
              <p class="text-justify">
                • La edad mínima para rentar un vehículo es de 21 años (nos
                reservamos el derecho de admitir a personas entre 21 y 25 años).
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • <b>Licencia de conducir vigente: </b> el cliente y cualquier
                conductor adicional debe poseer una licencia de conducir vigente
                del país de residencia. Los dominicanos no residentes o
                extranjeros deben presentar también pasaporte y los dominicanos
                residentes deben presentar su cédula de identidad y electoral.
                Nos reservamos el derecho de verificar la licencia de conducir
                según las normas establecidas y negar la renta de la unidad si
                no se cumple con dichas normas.
              </p></v-col
            >
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • <b>Tarjeta de crédito vigente:</b> aceptamos las más
                reconocidas tarjetas de crédito al momento del alquiler. Las
                tarjetas de crédito deben tener fondos disponibles para un hold
                o autorización cuyo monto dependerá del vehículo reservado y los
                días de alquiler. Pudiendo el cliente al concluir el alquiler
                pagar en efectivo en Pesos (RD$), Euros (EURO) o Dólares (USD$).
              </p>
            </v-col>

            <v-col cols="12" class="d-flex align-center mt-n6">
              <h1 class="font-weight-light display-1 mt-0">
                INFORMACIÓN DE RENTA Y RESERVACIONES
              </h1>
            </v-col>

            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Reservaciones: al realizar reservaciones a través de Internet,
                no es necesario que proporcione un número de Tarjeta de Crédito.
                Sin embargo estas reservaciones solo tendrán vigencia hasta 2
                horas después de pasada la hora de retiro del vehículo.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Impuestos: todos los cargos están sujetos al impuesto del 18%
                correspondiente al ITBIS.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                Existen Cargos Adicionales aplicables sólo en caso de:
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • "Drop-Off" (one-way): este cargo solo aplica si el Cliente
                desea tomar el automóvil en una Ciudad o Aeropuerto y desea
                regresar el automóvil en otra localidad.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Gasolina: este cargo aplica únicamente si el Cliente al
                devolver el auto, no lo entrega con el mismo nivel de gasolina
                que fue recibido.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Tarifas: la tarifa incluye la renta del auto por un período
                determinado (día, semana, mes) y kilometraje ilimitado. El
                tiempo mínimo permitido para la renta de cualquier vehículo es
                de no menos 3 días (72 horas). El cargo mínimo por alquiler será
                de un día (24 horas a partir de la hora de recibida la unidad),
                independientemente de que el cliente ocupe el auto solo una
                parte de ese tiempo. Para efectos los días de renta se
                considerarán por lapsos de 24 horas o fracción que exceda de 4
                horas. La tarifa de renta NO incluye el pago de multas,
                infracciones, arrastre de grúas, gasolina, dejar el auto en otra
                localidad (Drop off), ni cualquier otro cargo al cliente.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Lugar y fecha de devolución del auto: el lugar, la fecha y la
                hora convenidos para la devolución del vehículo no podrán ser
                modificados sin la autorización previa y por escrito por parte
                de nuestras oficinas. En caso de incumplimiento a esta
                disposición por parte del cliente, tendrá que pagar los cargos
                derivados.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Conductor adicional: el cliente podrá designar un conductor
                adicional mayor de 25 años de edad y con licencia de conducir
                vigente expedida por las autoridades competentes. Este servicio
                tendrá un cargo extra de 3 dólares más impuestos. El conductor
                adicional estará sujeto a todas las obligaciones del cliente en
                materia del manejo del vehículo y es también responsable
                solidario con aquel en lo que se refiere a la responsabilidad
                civil por daños a terceros y/o a la unidad.
              </p>
            </v-col>
          </v-row> -->
            </v-col>
            <v-col cols="12" md="5">
              <span style="font-size: 34px" class="my-application2"
                >Requisitos para alquilar vehículos con nosotros</span
              >
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-row justify="center">
          <span style="font-size: 64px" class="my-application4 mt-15"
            >Seguro & Cobertura</span
          >
        </v-row>
        <v-container>
          <v-row class="mt-6">
            <v-col cols="12" md="4">
              <v-img
                data-aos="fade-right"
                data-aos-duration="1500"
                aspect-ratio="1"
                contain
                src="../assets/seg1.jpg"
              >
              </v-img
            ></v-col>
            <v-col cols="12" md="4">
              <v-img
                data-aos="fade-up"
                data-aos-duration="1500"
                contain
                src="../assets/seg1.jpg"
              >
              </v-img>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                data-aos="fade-left"
                data-aos-duration="1500"
                contain
                src="../assets/seg1.jpg"
              >
              </v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-container>
        <v-col cols="12" md="12">
          <v-row class="mt-5" align="center" justify="end">
            <v-col cols="12" md="5">
              <v-row justify="end">
                <span
                  data-aos="fade-up"
                  data-aos-duration="3000"
                  style="font-size: 34px"
                  class="my-application2"
                  >Requirements to rent cars with us</span
                >
              </v-row>
            </v-col>
            <v-col cols="12" md="7">
              <v-row justify="start">
                <v-img
                  data-aos="fade-up"
                  data-aos-duration="3000"
                  contain
                  :aspect-ratio="16 / 9"
                  src="../assets/reqUs.jpg"
                >
                </v-img>
              </v-row>

              <!-- <v-row justify="center">
            <v-col cols="12" class="d-flex align-center">
              <h1 class="font-weight-light display-1 mt-8">
                REQUISITOS BÁSICOS
              </h1>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n4">
              <p class="text-justify">
                • La edad mínima para rentar un vehículo es de 21 años (nos
                reservamos el derecho de admitir a personas entre 21 y 25 años).
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • <b>Licencia de conducir vigente: </b> el cliente y cualquier
                conductor adicional debe poseer una licencia de conducir vigente
                del país de residencia. Los dominicanos no residentes o
                extranjeros deben presentar también pasaporte y los dominicanos
                residentes deben presentar su cédula de identidad y electoral.
                Nos reservamos el derecho de verificar la licencia de conducir
                según las normas establecidas y negar la renta de la unidad si
                no se cumple con dichas normas.
              </p></v-col
            >
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • <b>Tarjeta de crédito vigente:</b> aceptamos las más
                reconocidas tarjetas de crédito al momento del alquiler. Las
                tarjetas de crédito deben tener fondos disponibles para un hold
                o autorización cuyo monto dependerá del vehículo reservado y los
                días de alquiler. Pudiendo el cliente al concluir el alquiler
                pagar en efectivo en Pesos (RD$), Euros (EURO) o Dólares (USD$).
              </p>
            </v-col>

            <v-col cols="12" class="d-flex align-center mt-n6">
              <h1 class="font-weight-light display-1 mt-0">
                INFORMACIÓN DE RENTA Y RESERVACIONES
              </h1>
            </v-col>

            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Reservaciones: al realizar reservaciones a través de Internet,
                no es necesario que proporcione un número de Tarjeta de Crédito.
                Sin embargo estas reservaciones solo tendrán vigencia hasta 2
                horas después de pasada la hora de retiro del vehículo.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Impuestos: todos los cargos están sujetos al impuesto del 18%
                correspondiente al ITBIS.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                Existen Cargos Adicionales aplicables sólo en caso de:
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • "Drop-Off" (one-way): este cargo solo aplica si el Cliente
                desea tomar el automóvil en una Ciudad o Aeropuerto y desea
                regresar el automóvil en otra localidad.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Gasolina: este cargo aplica únicamente si el Cliente al
                devolver el auto, no lo entrega con el mismo nivel de gasolina
                que fue recibido.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Tarifas: la tarifa incluye la renta del auto por un período
                determinado (día, semana, mes) y kilometraje ilimitado. El
                tiempo mínimo permitido para la renta de cualquier vehículo es
                de no menos 3 días (72 horas). El cargo mínimo por alquiler será
                de un día (24 horas a partir de la hora de recibida la unidad),
                independientemente de que el cliente ocupe el auto solo una
                parte de ese tiempo. Para efectos los días de renta se
                considerarán por lapsos de 24 horas o fracción que exceda de 4
                horas. La tarifa de renta NO incluye el pago de multas,
                infracciones, arrastre de grúas, gasolina, dejar el auto en otra
                localidad (Drop off), ni cualquier otro cargo al cliente.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Lugar y fecha de devolución del auto: el lugar, la fecha y la
                hora convenidos para la devolución del vehículo no podrán ser
                modificados sin la autorización previa y por escrito por parte
                de nuestras oficinas. En caso de incumplimiento a esta
                disposición por parte del cliente, tendrá que pagar los cargos
                derivados.
              </p>
            </v-col>
            <v-col cols="12" class="d-flex align-center mt-n6">
              <p class="text-justify">
                • Conductor adicional: el cliente podrá designar un conductor
                adicional mayor de 25 años de edad y con licencia de conducir
                vigente expedida por las autoridades competentes. Este servicio
                tendrá un cargo extra de 3 dólares más impuestos. El conductor
                adicional estará sujeto a todas las obligaciones del cliente en
                materia del manejo del vehículo y es también responsable
                solidario con aquel en lo que se refiere a la responsabilidad
                civil por daños a terceros y/o a la unidad.
              </p>
            </v-col>
          </v-row> -->
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-row>
  </v-flex>
</template>

<script>
export default {
  name: "requerimientos-all",
};
</script>

<style></style>

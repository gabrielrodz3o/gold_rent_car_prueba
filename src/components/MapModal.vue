<template>
  <!-- <v-modal -->
  <!-- id="map-modal"
    title="BootstrapVue"
    size="xl"
    hide-header
    hide-footer
  > -->

  <iframe
    :src="`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.long}&hl=en&z=18&amp;output=embed`"
    width="99%"
    height="600"
    class="rounded-xl"
    frameborder="0"
  >
  </iframe>

  <!-- </v-modal> -->
</template>

<script>
export default {
  name: "MapModal",

  props: {
    coordinates: {
      type: Object,
      required: true,
    },
  },
};
</script>

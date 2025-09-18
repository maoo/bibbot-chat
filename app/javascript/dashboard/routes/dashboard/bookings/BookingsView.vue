<script>
import { mapGetters } from 'vuex';
import Frame from 'dashboard/components/widgets/DashboardApp/Frame.vue';

export default {
  name: 'BookingsView',
  components: { Frame },
  computed: {
    ...mapGetters({
      globalConfig: 'globalConfig/get',
    }),
    frameConfig() {
      const bibbotBookingUrl = this.globalConfig.bibbotBookingUrl;
      if (!bibbotBookingUrl) {
        return [];
      }
      // Frame.vue expects objects like { type: 'frame', url: 'https://...' }
      return [{ type: 'frame', url: bibbotBookingUrl }];
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    // Toggle visibility after mount so Frame.vue sets hasOpenedAtleastOnce
    this.$nextTick(() => {
      this.isVisible = true;
    });
  },
};
</script>

<template>
  <section class="w-full h-full min-w-0">
    <template v-if="frameConfig.length">
      <Frame :config="frameConfig" :is-visible="isVisible" :position="0" />
    </template>
    <div v-else class="w-full h-full flex items-center justify-center text-n-slate-11">
      <span>
        BIBBOT_BOOKING_URL environment variable is not configured.
      </span>
    </div>
  </section>
</template>


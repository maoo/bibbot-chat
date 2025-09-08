<script>
import { mapGetters } from 'vuex';
import Frame from 'dashboard/components/widgets/DashboardApp/Frame.vue';

export default {
  name: 'BookingsView',
  components: { Frame },
  computed: {
    ...mapGetters({
      dashboardApps: 'dashboardApps/getRecords',
    }),
    bookingApp() {
      return this.dashboardApps.find(app => app.title === 'Bookings');
    },
    frameConfig() {
      const content = this.bookingApp?.content || [];
      // Frame.vue expects objects like { type: 'frame', url: 'https://...' }
      return content.filter(item => item?.type === 'frame' && item?.url);
    },
  },
  data() {
    return {
      isVisible: false,
      isFetching: false,
    };
  },
  async mounted() {
    if (!this.dashboardApps?.length) {
      this.isFetching = true;
      try {
        await this.$store.dispatch('dashboardApps/get');
      } catch (e) {
        // ignore
      } finally {
        this.isFetching = false;
      }
    }
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
        No Dashboard App titled "Bookings" is configured yet.
      </span>
    </div>
  </section>
</template>


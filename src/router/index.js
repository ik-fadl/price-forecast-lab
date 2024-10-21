import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'init',
      redirect: 'dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/master',
      name: 'master',
      redirect: '/master/cabai-rawit-hijau',
      // component: () => import('../views/MasterView.vue'),
      children: [
        {
          path: '/master/cabai-rawit-hijau',
          name: 'cabai-rawit-hijau',
          component: () => import('../views/master/CabaiRawitHijau.vue'),
        },
        {
          path: '/master/cabai-rawit-merah',
          name: 'cabai-rawit-merah',
          component: () => import('../views/master/CabaiRawitMerah.vue'),
        },
        {
          path: '/master/cabai-merah-besar',
          name: 'cabai-merah-besar',
          component: () => import('../views/master/CabaiMerahBesar.vue'),
        },
        {
          path: '/master/cabai-merah-keriting',
          name: 'cabai-merah-keriting',
          component: () => import('../views/master/CabaiMerahKeriting.vue'),
        },
        {
          path: '/master/minyak-goreng-curah',
          name: 'minyak-goreng-curah',
          component: () => import('../views/master/MinyakGorengCurah.vue'),
        },
        {
          path: '/master/minyak-goreng-kemasan',
          name: 'minyak-goreng-kemasan',
          component: () => import('../views/master/MinyakGorengKemasan.vue'),
        },
        {
          path: '/master/telur-ayam-ras',
          name: 'telur-ayam-ras',
          component: () => import('../views/master/TelurAyamRas.vue'),
        },
        {
          path: '/master/gula-pasir-lokal',
          name: 'gula-pasir-lokal',
          component: () => import('../views/master/GulaPasirLokal.vue'),
        },
        {
          path: '/master/gula-pasir-premium',
          name: 'gula-pasir-premium',
          component: () => import('../views/master/GulaPasirPremium.vue'),
        },
      ],
    },
    {
      path: '/forecast',
      name: 'forecast',
      redirect: '/forecast/cabai-rawit-hijau',
      children: [
        {
          path: '/forecast/cabai-rawit-hijau',
          name: 'prediksi-harga-cabai-rawit-hijau',
          component: () => import('../views/forecast/CabaiRawitHijau.vue'),
        },
        {
          path: '/forecast/cabai-rawit-merah',
          name: 'prediksi-harga-cabai-rawit-merah',
          component: () => import('../views/forecast/CabaiRawitMerah.vue'),
        },
        {
          path: '/forecast/cabai-merah-besar',
          name: 'prediksi-harga-cabai-merah-besar',
          component: () => import('../views/forecast/CabaiMerahBesar.vue'),
        },
        {
          path: '/forecast/cabai-merah-keriting',
          name: 'prediksi-harga-cabai-merah-keriting',
          component: () => import('../views/forecast/CabaiMerahKeriting.vue'),
        },
        {
          path: '/forecast/minyak-goreng-curah',
          name: 'prediksi-harga-minyak-goreng-curah',
          component: () => import('../views/forecast/MinyakGorengCurah.vue'),
        },
        {
          path: '/forecast/minyak-goreng-kemasan',
          name: 'prediksi-harga-minyak-goreng-kemasan',
          component: () => import('../views/forecast/MinyakGorengKemasan.vue'),
        },
        {
          path: '/forecast/telur-ayam-ras',
          name: 'prediksi-harga-telur-ayam-ras',
          component: () => import('../views/forecast/TelurAyamRas.vue'),
        },
        {
          path: '/forecast/gula-pasir-lokal',
          name: 'prediksi-harga-gula-pasir-lokal',
          component: () => import('../views/forecast/GulaPasirLokal.vue'),
        },
        {
          path: '/forecast/gula-pasir-premium',
          name: 'prediksi-harga-gula-pasir-premium',
          component: () => import('../views/forecast/GulaPasirPremium.vue'),
        },
      ],
    },
    {
      path: '/uji',
      name: 'uji',
      component: () => import('../views/UjiView.vue'),
    },
  ],
})

export default router

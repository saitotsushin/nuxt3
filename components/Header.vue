<template>
    <header class="sticky-menu">
      <h1 class="font-bit"><NuxtLink to="/" @click="handleClick"><img src="~/assets/images/logo.svg"></NuxtLink></h1>
      <h2 class="font-bit menu-sneaker-name">{{ website.name }}</h2>
      <div class="switchQualityBox">
        <div class="switchQuality">
          <div class="switchQualityName">
            ABOUT
          </div>
          <label class="toggle-button">
            <input type="checkbox"/>
          </label>
        </div>
      </div>
    </header>

</template>
<script setup>
const website = useWebsiteStore();
const componentStore = useComponentStore()
function handleClick(event) {
  const store = useWebsiteStore();
  store.setSiteDate("", "", "");
  componentStore.showPage(0);
}
</script>

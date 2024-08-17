<template>
    <header class="sticky-menu">
      <h1 class="font-bit"><NuxtLink to="/"><img src="~/assets/images/logo.svg"></NuxtLink></h1>
      <h2>{{ website.name }}</h2>
      <div class="switchQualityBox">
        <div class="switchQuality">
          <div class="switchQualityName">
            HI
          </div>
          <label class="toggle-button">
            <input type="checkbox"/>
          </label>
          <div class="switchQualityName">
            LOW
          </div>
        </div>
        <div class="half-circle"></div>
      </div>
    </header>

</template>
<script setup>
  const website = useWebsiteStore();
</script>
<style>
header h1 a{
  display: flex;
}
header h1 a img{
}
.sticky-menu {
    position: -webkit-sticky; /* サポートされていないブラウザ用のプレフィックス */
    position: sticky;
    display: flex;
    top: 0;
    color: white;
    border-bottom: 3px solid #FFF;
    padding: 0;
    z-index: 1000; /* 必要に応じて調整 */
    background-color: #F15928;
    justify-content:space-between;
    /* align-items: center; */
}
.sticky-menu h1{
  font-size: 16px;
  padding: 0.25rem 0.75rem;
  border-right: 2px solid #FFF;
}
.sticky-menu nav{
  border-left: 1px solid #FFF;
}
.sticky-menu nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
}

.sticky-menu nav ul li {
    font-size: 12px;
}

.sticky-menu nav ul li a {
    color: white;
    text-decoration: none;
    padding: 8px 15px;
    display: block;
}

.sticky-menu nav ul li a:hover {
    background-color: #575757;
}
</style>

<template>
    <header class="sticky-menu">
      <h1 class="font-bit"><NuxtLink to="/">SAITOTSUSHIN</NuxtLink></h1>
      <nav>
        <ul>
            <li><a href="#section2">NIKE</a></li>
            <li><a href="#section3">addidas</a></li>
            <li><a href="#section4">VANS</a></li>
        </ul>
      </nav>
    </header>

</template>

<style>
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
}
.sticky-menu h1{
  font-size: 16px;
  padding: 0.25rem 0.75rem;
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

<template>
    <div class="container">
        <div class="text-center" style="margin: 20px 0px 20px 0px;">
            <h3 class="text-center">BOOK MANAGEMENT</h3><br/>
        </div>
        <nav class="navbar navbar-expand-sm bg-light">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-item nav-link">Author</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/book" class="nav-item nav-link">Book</router-link>
            </li>
          </ul>
        </nav>
        <br/>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {}
</script>
<template>
  <div class="LoginLink"></div>
</template>

<script lang="ts">
// Imports
import { Component, Mixins } from 'vue-property-decorator';
import FirebaseAuth from '@/mixins/FirebaseAuth';

// Vue component
@Component({})
export default class Home extends Mixins(FirebaseAuth) {}
</script>

<style scoped lang="scss"></style>

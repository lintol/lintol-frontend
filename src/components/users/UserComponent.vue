<template>
  <div id="user-component">
    <div v-if="user">
      <img class="userProfilePicture" src="../../assets/images/profile.png"></img>
      <label>{{ user.name }}</label>
    </div>
    <div v-else>
      <label>(unknown)</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserComponent',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';

label {
  font-size: 0.75em;
  color: #777776;
}

.userProfilePicture {
  height: 18px
}
</style>

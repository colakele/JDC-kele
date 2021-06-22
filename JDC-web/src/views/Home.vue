<template>
<div class="mdui-container">
    <div class="mdui-row">
      <div class="mdui-col-xs-12 mdui-col-lg-4 mdui-col-offset-lg-4">
        <My/>
      </div>
    </div>
</div>
</template>

<script>
import My from '../components/My'
export default {
  name: 'Home',
  components: {
    My
  }
}
</script>

<template>
<div class="mdui-container">
    <div class="mdui-row">
      <div class="mdui-col-xs-12 mdui-col-lg-4 mdui-col-offset-lg-4">
        <PushCode/>
      </div>
    </div>
</div>
</template>

<script>
import PushCode from '../components/Push'
export default {
  name: 'Push',
  components: {
    PushCode
  }
}
</script>
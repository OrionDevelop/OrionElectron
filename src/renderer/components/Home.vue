<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="text">
    <p>
      あああ
    </p>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { mapActions, mapState } from 'vuex'
import { Action, State } from 'vuex-class'

import { Account } from '../models/account';
import { Authorization } from '../models/authorization';

@Component
export default class Home extends Vue {

  @Prop({ default: '処理中...' })
  public text: string;

  @State(state => state.Accounts.main)
  accounts: Account[];

  @Action('registerAccount')
  registerAccount: (payload: Account) => void;

  get fullscreenLoading(): boolean {
    return this.accounts.length == 0;
  }

  public mounted(): void {
    if (this.accounts.length == 0) {
      new Authorization((account: Account) => {
        console.log('a');
        this.registerAccount(account);
      });
    }
  }
}
</script>

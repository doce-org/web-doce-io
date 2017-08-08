<template>
  
    <div id="dashboard-debug-component" class="tile is-child">

        <div class="columns is-vcentered is-marginless has-text-centered">

            <div class="column is-narrow">
                <span class="icon">
                    <i class="fa fa-arrows"></i>
                </span>
            </div>

            <div class="column">
                <h6 class="title is-6">Debug</h6>
            </div>

        </div>

        <div class="columns is-centered is-vcentered is-marginless">

            <div class="column">

                <form v-on:submit.prevent="send">

                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">Valeurs</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input v-model="command.type" class="input is-small" type="text" placeholder="Type">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model="command.identifier" class="input is-small" type="text" placeholder="Identifiant">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label"></div>
                        <div class="field-body">
                            <div class="field is-expanded">
                                <div class="control">
                                    <input v-model="command.value" class="input is-small" type="text" placeholder="Valeur">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label">
                            <!-- Left empty for spacing -->
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <button type="submit" class="button is-success is-outlined is-small">Envoyer</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form> 

            </div>

        </div>

    </div>

</template>

<script>

    // services
    import { serialService } from 'services';

    export default {

        data() {
            return {

                'command': {

                    command: 'send'

                }

            }
        },

        methods: {

            send() {

                serialService.create( this.command )
                .catch( this.handlingErrors );

            }

        }
    
    }

</script>

<style lang="scss">

    #dashboard-debug-component {
        height: 300px;
        background: white;

        .columns {

            &:first-child {
                background: #f5f6f8;

                .icon {
                    color: #dedede;
                }
            }

            &.content {
                padding: 2rem;
            }
        }
    }

</style>


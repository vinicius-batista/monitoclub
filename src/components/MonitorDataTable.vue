<template>
    <v-data-table
            :headers="weekDays"
            :items="dataTable"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-center" >{{ props.item.horario }}</td>
            <td class="text-xs-center">{{ props.item.dayOfWeek }}</td>
            <td class="text-xs-center">{{ props.item.local }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default {
      props: {
        dataTable: {
          type: Array,
          required: true
        }
      },
      data () {
        return {
          weekDays: [
            {text: 'Horario', value: 'horario', sortable: true, align: 'center'},
            {text: 'Dia da Semana', value: 'dayOfWeek', sortable: true, align: 'center'},
            {text: 'Local', value: 'local', sortable: false, align: 'center'}
          ]
        }
      }
    }
</script>
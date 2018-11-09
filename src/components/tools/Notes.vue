
<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="worktimes"
      hide-actions
      disable-initial-sort
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td class="text-xs-right">{{ props.item.arrivalTime }}</td>
        <td class="text-xs-right">{{ props.item.leavingTime }}</td>
        <td class="text-xs-right">{{ props.item.actualTime }}</td>
        <td class="text-xs-right">{{ props.item.break }}</td>
        <td class="text-xs-right">{{ props.item.actualNettoTime }}</td>
        <td class="text-xs-right">{{ props.item.targetTime }}</td>
        <td class="text-xs-right">
        <v-icon
            small
            class="mr-2"
            :color="props.item.overtime[0] === '+' || props.item.overtime[0] !== '-' ? 'green' : 'red'"
          >
            {{ props.item.overtime[0] === '+' || props.item.overtime[0] !== '-' ? 'trending_up' : 'trending_down' }}
          </v-icon>
          {{ props.item.overtime }}
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'Datum', value: 'date'},
          { text: 'Arrival', align: 'right', sortable: false, value: 'arrivalTime' },
          { text: 'Leaving', align: 'right', sortable: false, value: 'leavingTime' },
          { text: 'Actual', align: 'right', sortable: false, value: 'actualTime' },
          { text: 'Break', align: 'right', sortable: false, value: 'break' },
          { text: 'Actual (Netto)', align: 'right', sortable: false, value: 'actualNettoTime' },
          { text: 'Target', align: 'right', sortable: false, value: 'targetTime' },
          { text: 'Overtime', align: 'right', sortable: false, value: 'overtime' }
        ],
        worktimes: [
          {
            date: '29.10.2018',
            arrivalTime: '9:00',
            leavingTime: '17:30',
            actualTime: '8:30',
            break: '0:45',
            actualNettoTime: '7:45',
            targetTime: '8:00',
            overtime: '-00:15'
          },
          {
            date: '24.10.2018',
            arrivalTime: '7:55',
            leavingTime: '16:00',
            actualTime: '8:05',
            break: '0:45',
            actualNettoTime: '7:20',
            targetTime: '8:00',
            overtime: '-00:40'
          },
          {
            date: '20.10.2018',
            arrivalTime: '8:00',
            leavingTime: '17:45',
            actualTime: '9:59',
            break: '0:45',
            actualNettoTime: '9:14',
            targetTime: '8:00',
            overtime: '+01:14'
          }
        ]
      }
    }
  }
</script>
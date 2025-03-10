import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Box,
} from '@mui/material';
import { useEquipment } from '../contexts/EquipmentContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const ControlSummary = () => {
  const { equipmentList, calculateControlTotals, getEquipmentByType, calculateItemPrice } = useEquipment();

  // Calculate control totals
  const controlTotals = calculateControlTotals();
  
  // Get equipment grouped by type
  const groupedEquipment = getEquipmentByType();
  
  // Calculate total price by equipment type for the pie chart
  const equipmentTypeTotals = {};
  Object.entries(groupedEquipment).forEach(([type, items]) => {
    equipmentTypeTotals[type] = items.reduce(
      (sum, item) => sum + calculateItemPrice(item),
      0
    );
  });
  
  // Prepare data for the pie chart
  const chartData = {
    labels: Object.entries(groupedEquipment).map(([_, items]) => items[0].name),
    datasets: [
      {
        data: Object.values(equipmentTypeTotals),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#8AC926',
          '#1982C4',
          '#6A4C93',
          '#F45B69',
          '#2EC4B6',
          '#E71D36',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Control Components Summary (Internal Use)
      </Typography>

      {equipmentList.length === 0 ? (
        <Typography variant="body1" sx={{ my: 4, textAlign: 'center' }}>
          No equipment added yet. Use the form above to add equipment.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Control Totals Table */}
          <Grid item xs={12} md={6}>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Control Type</TableCell>
                    <TableCell align="right">Total Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Starters (ST)</TableCell>
                    <TableCell align="right">{controlTotals.ST}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Switches (SW)</TableCell>
                    <TableCell align="right">{controlTotals.SW}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sensors (SEN)</TableCell>
                    <TableCell align="right">{controlTotals.SEN}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Relays (REL)</TableCell>
                    <TableCell align="right">{controlTotals.REL}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Valves (VA)</TableCell>
                    <TableCell align="right">{controlTotals.VA}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>TOTAL COMPONENTS</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      {Object.values(controlTotals).reduce((sum, count) => sum + count, 0)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Cost Distribution by Equipment Type
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie data={chartData} options={chartOptions} />
            </Box>
          </Grid>

          {/* Detailed Control Components by Equipment Type */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Detailed Control Components by Equipment Type
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Equipment Type</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">ST</TableCell>
                    <TableCell align="right">SW</TableCell>
                    <TableCell align="right">SEN</TableCell>
                    <TableCell align="right">REL</TableCell>
                    <TableCell align="right">VA</TableCell>
                    <TableCell align="right">Total Components</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(groupedEquipment).map(([type, items]) => {
                    // Calculate control totals for this equipment type
                    const typeControlTotals = { ST: 0, SW: 0, SEN: 0, REL: 0, VA: 0 };
                    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
                    
                    items.forEach(item => {
                      const quantity = item.quantity || 1;
                      Object.keys(typeControlTotals).forEach(controlType => {
                        typeControlTotals[controlType] += (item.controls?.[controlType] || 0) * quantity;
                      });
                    });
                    
                    const totalComponents = Object.values(typeControlTotals).reduce(
                      (sum, count) => sum + count,
                      0
                    );

                    return (
                      <TableRow key={type}>
                        <TableCell>{items[0].name}</TableCell>
                        <TableCell align="right">{totalQuantity}</TableCell>
                        <TableCell align="right">{typeControlTotals.ST}</TableCell>
                        <TableCell align="right">{typeControlTotals.SW}</TableCell>
                        <TableCell align="right">{typeControlTotals.SEN}</TableCell>
                        <TableCell align="right">{typeControlTotals.REL}</TableCell>
                        <TableCell align="right">{typeControlTotals.VA}</TableCell>
                        <TableCell align="right">{totalComponents}</TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {/* Totals row */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>TOTALS</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      {equipmentList.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>{controlTotals.ST}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>{controlTotals.SW}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>{controlTotals.SEN}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>{controlTotals.REL}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>{controlTotals.VA}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      {Object.values(controlTotals).reduce((sum, count) => sum + count, 0)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default ControlSummary;

import { TableRow, TableCell, Checkbox } from '@mui/material';

function TableRowComponent({ row, rowIndex, handleCheckboxChange }) {
    return (
        <TableRow key={row.no} sx={{ '& > *': { borderBottom: 'unset' } }}>
            <>
                <TableCell component="th" scope="row" style={{ position: 'sticky', left: 0, backgroundColor: 'white', zIndex: 1 }}>{row.no}</TableCell>
                <TableCell align="left" style={{ position: 'sticky', left: 50, backgroundColor: 'white', zIndex: 1 }}>{row.part}</TableCell>
                <TableCell align="center">{row.check}</TableCell>
                <TableCell align="center">{row.spec}</TableCell>
                <TableCell align="center" padding="checkbox">
                    <Checkbox
                        checked={row.sudahDikerjakan.ya}
                        onChange={() => handleCheckboxChange(rowIndex, 'ya')}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="success"
                    />
                </TableCell>
                <TableCell align="center" padding="checkbox">
                    <Checkbox
                        checked={row.sudahDikerjakan.tidak}
                        onChange={() => handleCheckboxChange(rowIndex, 'tidak')}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{
                            '&.Mui-checked': {
                                color: "red",
                            },
                        }}
                    />
                </TableCell>
                </>
        </TableRow>
    );
}

export default TableRowComponent;

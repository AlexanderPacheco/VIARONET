const express = require('express');
const app = express();
var cors = require('cors');

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(cors({
    origin: '*'
}));

//Routes
app.use('/alumno/', require('./routes/alumno'));
app.use('/profesor/', require('./routes/profesor'));
app.use('/grado/', require('./routes/grado'));
app.use('/asignacion/', require('./routes/alumnoGrado'));

//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

//npm run dev
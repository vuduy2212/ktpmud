import authRouter from './auth';
import storedRouter from './stored';
import allCodeRouter from './allCode';
import userRouter from './user';
import doctorRouter from './doctor';
import specialistRouter from './specialist';
import clinicRouter from './clinic';
import bookingRouter from './booking';
function Route(app) {
    app.use('/api/auth', authRouter); // đăng kí, đăng nhập
    app.use('/api/stored', storedRouter);
    app.use('/api/allcode', allCodeRouter); // kí hiệu
    app.use('/api/user', userRouter); // user chung
    app.use('/api/doctor', doctorRouter); // bác sĩ
    app.use('/api/specialist', specialistRouter); // chuyên khoa
    app.use('/api/clinic', clinicRouter); // chuyên khoa
    app.use('/api/booking', bookingRouter); // chuyên khoa
}

module.exports = Route;

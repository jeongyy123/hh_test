import mongoose from 'mongoose';
const connect = () => {
  mongoose
    .connect(
      // <password>을 빼고 비번 넣기
      'mongodb+srv://sparta-user:aaaa4321@express-mongo.5vbi9ch.mongodb.net/?retryWrites=true&w=majority', 
      {
        dbName: 'users_memo',
      },
    )
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};
mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});
export default connect;
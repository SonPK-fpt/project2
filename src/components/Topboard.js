import { connect } from "react-redux";
import { Table, Image }  from "react-bootstrap";
import avatars from "../img/index";

const Topboard = ({ users }) => {

    function getUserAvatarName(avatar) {
        const avaName = avatar.toString();
        return avaName.split('/')[3].split('.')[0];
    }

    const userArr = [{}];

    users.forEach(element => {
        const created = localStorage.getItem(element.id);
        userArr.push({ id: element.id, name: element.name, created: parseInt(created, 10), answered: Object.keys(element.answers).length})
    });
    userArr.shift();
    userArr.sort((a, b) => {
        const sumA = a.created + a.answered;
        const sumB = b.created + b.answered;
        return sumB - sumA;
      });

    return (
        <div>
            <h1 className="text-center m-2">LEADERBOARD</h1>
            <Table bordered hover variant="light text-center">
                <thead>
                    <tr>
                        <th>USER</th>
                        <th>QUESTION CREATED</th>
                        <th>QUESTION ANSWERED</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userArr.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Image className="rounded-circle" 
                                    src={avatars.filter((a) => getUserAvatarName(a) === user.id)} 
                                    height="50" width="50" data-testid="avatar" />
                                    <p data-testid="userName">{user.name}</p>
                                    <p data-testid="userId">{user.id}</p>
                                </td>
                                <td className="align-middle" data-testid="questions">{user.created}</td>
                                <td className="align-middle" data-testid="answered">{user.answered}</td>
                            </tr>
    
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};

const mapStateToProps = ({ users }) => ({
    users: Object.values(users).sort((a, b) => 
    (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)),
});

export default connect(mapStateToProps)(Topboard);

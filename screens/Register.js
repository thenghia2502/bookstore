/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
const validatePassword = (password) => {
    // Kiểm tra độ dài tối thiểu của mật khẩu
    if (password.length < 8) {
      return false;
    }
    // Kiểm tra xem mật khẩu có chứa ký tự đặc biệt không
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacters.test(password)) {
      return false;
    }
    // Nếu mật khẩu thỏa mãn tất cả các yêu cầu, trả về true
    return true;
  };

const Register = (props) =>{
    const [password, setPassword] = useState('');
    const [isSecure, setIsSecure] = useState(true);
    const [error, setError] = useState(false);
    const handleSignUp = () => {
        const validation = validatePassword(password);
        if (validation !== true) {
            // Nếu mật khẩu không hợp lệ, hiển thị thông báo lỗi
            setError(true);
            return;
        }
    };
        // Nếu mật khẩu hợp lệ, tiếp tục với quá trình đăng ký
        // Ví dụ: Gọi API để thực hiện đăng ký tài khoản
    const handleToggleSecureTextEntry = () => {
        setIsSecure(!isSecure);
    };
    return <View
                style={{ flex: 10 }}>
        <View
            style={styles.header}>
            <View
                style={{ flexDirection: 'row' }}>
                <Image
                    source={require('../assets/left-arrow-svgrepo-com.png')}
                    style={styles.icon}
                />
                <Text
                    style={{ fontSize: 20, }}>
                    Đăng ký
                </Text>
            </View>
            <Image
                source={require('../assets/question-circle-svgrepo-com.png')}
                style={styles.icon}
            />
        </View>
        <View
            style={styles.container}>
            <TextInput 
                style={styles.username}
                placeholder="Tài khoản" />
            <View
                style={{flexDirection: 'row'}}>
                <TextInput
                    style={[styles.password, error && styles.errorInput]}
                    placeholder="Mật khẩu"
                    onChangeText={(text) => {
                        setPassword(text);
                        setError(false); // Reset state lỗi khi người dùng thay đổi mật khẩu
                      }}
                    secureTextEntry={isSecure} // Sử dụng biến isSecure để xác định trạng thái của secureTextEntry
                />
                <TouchableOpacity
                    onPress={handleToggleSecureTextEntry} 
                    style={styles.toggleButton}>
                    <Text
                        style={styles.toggleButtonText}>
                            {isSecure ? 'Hiện ' : ' Ẩn '}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Hiển thị thông báo lỗi */}
            {error && <Text style={styles.errorText}>Mật khẩu không hợp lệ</Text>}

                {/* Button Đăng ký */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}>
                <Text>
                    Đăng ký
                </Text>
            </TouchableOpacity>
            <View
                style={styles.box}>
                <Text>
                    Bạn đã có tài khoản chưa?
                </Text>
                <Text
                    style={styles.login}>
                        Đăng nhập
                </Text>
            </View>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    icon:{
        height: 30,
        width: 30,
    },
    header:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'space-between',
    },
    container:{
        flex: 9,
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 5,
        rowGap: 5,
    },
    username:{
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    password:{
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 9,
    },
    button:{
        borderRadius: 5,
        borderWidth:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        backgroundColor: '#e6e6fa',
        marginVertical: 10 ,
    },
    box:{
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    toggleButton: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    toggleButtonText: {
        fontSize: 16,
    },
    errorInput: {
        borderColor: 'red', // Thay đổi màu sắc biên viền khi có lỗi
    },
    errorText: {
        color: 'red', // Thay đổi màu sắc chữ khi có lỗi
        marginBottom: 10,
    },
    login: {
        color: 'steelblue',
        marginLeft: 5,
    },
});
export default Register;

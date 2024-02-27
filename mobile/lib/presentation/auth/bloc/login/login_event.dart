// part of 'login_bloc.dart';

// abstract class LoginEvent extends Equatable {
//   const LoginEvent();

//   @override
//   List<Object> get props => [];
// }

// class LoginSubmit extends LoginEvent {
//   const LoginSubmit({
//     required this.phone,
//     required this.password,
//   });

//   final String phone;
//   final String password;

//   @override
//   List<Object> get props => [phone, password];
// }
part of 'login_bloc.dart';

abstract class LoginEvent {}

class LoginSubmitEvent extends LoginEvent {
  final LoginByPhoneRequestDTO params;

  LoginSubmitEvent(this.params);
}

part of 'auth_patient_bloc.dart';

enum AuthenticationStatus {
  unknown,
  authenticated,
  unauthenticated,
}

class AuthPatientState extends Equatable {
  const AuthPatientState._({
    this.status = AuthenticationStatus.unknown,
    this.patient,
  });

  const AuthPatientState.unknown() : this._();

  const AuthPatientState.authenticated(PatientModel patient)
      : this._(status: AuthenticationStatus.authenticated, patient: patient);

  const AuthPatientState.unauthenticated()
      : this._(status: AuthenticationStatus.unauthenticated);

  final AuthenticationStatus status;
  final PatientModel? patient;

  @override
  List<Object?> get props => [status, patient];
}

part of 'auth_patient_bloc.dart';

abstract class AuthPatientEvent extends Equatable {
  const AuthPatientEvent();

  @override
  List<Object?> get props => [];
}

class AuthPatientInfoCheck extends AuthPatientEvent {}

class AuthPatientInfoSet extends AuthPatientEvent {
  const AuthPatientInfoSet({required this.patient});

  final PatientModel? patient;

  @override
  List<Object?> get props => [patient];
}

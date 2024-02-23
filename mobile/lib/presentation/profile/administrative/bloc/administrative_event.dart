part of 'administrative_bloc.dart';

abstract class AdministrativeEvent {}

class GetProfilePatientEvent extends AdministrativeEvent {}

class UpdateProfilePatientEvent extends AdministrativeEvent {
  UpdateProfilePatientEvent();
}

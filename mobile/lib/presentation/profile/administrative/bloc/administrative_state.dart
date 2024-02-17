part of 'administrative_bloc.dart';

sealed class AdministrativeState extends Equatable {
  const AdministrativeState();
  
  @override
  List<Object> get props => [];
}

final class AdministrativeInitial extends AdministrativeState {}

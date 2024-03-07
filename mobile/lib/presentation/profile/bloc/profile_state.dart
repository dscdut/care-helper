part of 'profile_bloc.dart';

class ProfileState extends Equatable {
  const ProfileState({
    this.currentIndex = 0,
    this.isLoading = false,
    this.patient,
    this.error = '',
  });

  final int currentIndex;
  final bool isLoading;
  final PatientModel? patient;
  final String error;

  @override
  List<Object> get props => [currentIndex];

  ProfileState copyWith({
    int? currentIndex,
    bool? isLoading,
    PatientModel? patient,
    String? error,
  }) {
    return ProfileState(
      currentIndex: currentIndex ?? this.currentIndex,
      isLoading: isLoading ?? this.isLoading,
      patient: patient ?? this.patient,
      error: error ?? this.error,
    );
  }
}

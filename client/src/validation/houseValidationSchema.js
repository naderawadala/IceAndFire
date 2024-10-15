import * as Yup from 'yup';

const houseValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('House name is required.')
        .min(2, 'House name must be between 2 and 100 characters.')
        .max(100, 'House name must be between 2 and 100 characters.'),

    region: Yup.string()
        .required('Region is required.')
        .min(2, 'Region must be between 2 and 100 characters.')
        .max(100, 'Region must be between 2 and 100 characters.'),

    coatOfArms: Yup.string()
        .required('Coat of Arms description is required.')
        .max(200, 'Coat of Arms description cannot exceed 200 characters.'),

    words: Yup.string()
        .required('Words (motto) are required.')
        .max(100, 'Words cannot exceed 100 characters.'),

    titles: Yup.string().test(
        'all-titles', 
        'Titles must not contain empty or whitespace values.', 
        value => !value || value.split(',').every(title => title.trim() !== '')
    ),

    seats: Yup.string().test(
        'all-seats', 
        'Seats must not contain empty or whitespace values.', 
        value => !value || value.split(',').every(seat => seat.trim() !== '')
    ),

    currentLord: Yup.string()
        .max(100, 'Current Lord\'s name cannot exceed 100 characters.'),

    heir: Yup.string()
        .max(100, 'Heir\'s name cannot exceed 100 characters.'),

    overlord: Yup.string()
        .max(100, 'Overlord\'s name cannot exceed 100 characters.'),

    founded: Yup.string()
        .max(100, 'Founded date cannot exceed 100 characters.'),

    founder: Yup.string()
        .max(100, 'Founder\'s name cannot exceed 100 characters.'),

    diedOut: Yup.string()
        .max(100, 'Died out description cannot exceed 100 characters.'),

    ancestralWeapons: Yup.string().test(
        'all-ancestralWeapons', 
        'Ancestral weapons must not contain empty or whitespace values.', 
        value => !value || value.split(',').every(weapon => weapon.trim() !== '')
    ),

    cadetBranches: Yup.string().test(
        'all-cadetBranches', 
        'Cadet branches must not contain empty or whitespace values.', 
        value => !value || value.split(',').every(branch => branch.trim() !== '')
    ),

    swornMembers: Yup.string().test(
        'all-swornMembers', 
        'Sworn members must not contain empty or whitespace values.', 
        value => !value || value.split(',').every(member => member.trim() !== '')
    ),
});

export default houseValidationSchema;

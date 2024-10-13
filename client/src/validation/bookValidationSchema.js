import * as Yup from 'yup';

const bookValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Book name is required.')
        .min(2, 'Book name must be between 2 and 100 characters.')
        .max(100, 'Book name must be between 2 and 100 characters.'),
        
    isbn: Yup.string()
        .required('ISBN is required.')
        .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, 
            'Invalid ISBN format. ISBN must be 10 or 13 digits, and may contain hyphens. Example: 978-3-16-148410-0 or 0-19-852663-6.'),
    
    authors: Yup.string()
        .required('At least one author is required.')
        .test('all-authors', 'Author names cannot be empty.', 
            value => value && value.split(',').every(author => author.trim() !== '')),
    
    numberOfPages: Yup.number()
        .required('Number of pages is required.')
        .min(1, 'Number of pages must be greater than zero.'),

    publisher: Yup.string()
        .required('Publisher is required.')
        .max(50, 'Publisher name cannot exceed 50 characters.'),

    country: Yup.string().required('Country is required.'),

    mediaType: Yup.string().required('Media type is required.'),

    released: Yup.date()
        .required('Release date is required.')
        .max(new Date(), 'Release date cannot be in the future.'),

    characters: Yup.string().test(
        'all-characters', 'Character names cannot be empty strings.', 
        value => !value || value.split(',').every(character => character.trim() !== '')
    ),

    povCharacters: Yup.string().test(
        'all-povCharacters', 'POV character names cannot be empty strings.', 
        value => !value || value.split(',').every(povCharacter => povCharacter.trim() !== '')
    ),
});

export default bookValidationSchema;
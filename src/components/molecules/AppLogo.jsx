import PropTypes from 'prop-types'
      import Icon from '@/components/atoms/Icon'
      import Heading from '@/components/atoms/Heading'
      import Text from '@/components/atoms/Text'
      
      const AppLogo = ({ title, subtitle, iconName, iconBgColor }) => {
        return (
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center`}>
              <Icon name={iconName} className="text-white" size={24} />
            </div>
            <div>
              <Heading level={1} className="text-2xl md:text-3xl font-bold text-white mb-0">
                {title}
              </Heading>
              <Text className="text-white/80 text-sm">{subtitle}</Text>
            </div>
          </div>
        )
      }
      
      AppLogo.propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        iconName: PropTypes.string.isRequired,
        iconBgColor: PropTypes.string.isRequired,
      }
      
      export default AppLogo
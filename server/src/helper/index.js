const os = require('os');

function getLocalIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = null;

  // Iterate through network interfaces to find the IPv4 address
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
    if (ipAddress) break; // Exit loop if IP address is found
  }

  return ipAddress;
}

module.exports = getLocalIpAddress



